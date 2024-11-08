import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserRole } from 'src/auth/models/user.model';
import { SignUpInput } from './dtos/signup.dto';

import { LoginInput } from './dtos/login.dto';
import { UpdateInput } from './dtos/update.dto';
import { JwtService } from '@nestjs/jwt';
import { GqlExecutionContext, GraphQLExecutionContext } from '@nestjs/graphql';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async patientSignUp(signUpInput: SignUpInput): Promise<User> {
    let caseNumber = this.generateCaseNumber();
    const patientExists = await this.userModel.findOne({
      where: { email: signUpInput.email },
    });
    if (patientExists && patientExists.roles.includes(UserRole.PATIENT)) {
      throw new HttpException(
        'patient is already existed',
        HttpStatus.NOT_FOUND,
      );
    } else if (
      patientExists &&
      !patientExists.roles.includes(UserRole.PATIENT)
    ) {
      patientExists.caseNumber = caseNumber;
      patientExists.roles.push(UserRole.PATIENT);
      return await patientExists.save();
    } else {
      const newPatient = await this.userModel.create({
        ...signUpInput,
        caseNumber,
        roles: [UserRole.PATIENT],
      });
      console.log(newPatient);
      return await newPatient.save();
    }
  }

  async login(loginInput: LoginInput): Promise<User> {
    let user = await this.userModel.findOne({ email: loginInput.email });
    if (!user) {
      throw new HttpException(
        'user is not existed with this email',
        HttpStatus.NOT_FOUND,
      );
    }
    if (!bcrypt.compare(loginInput.password, user.password)) {
      throw new HttpException('wrong information', HttpStatus.NOT_FOUND);
    }
    return user;
  }
  async changePatientInfo(updateInput: UpdateInput, ctx) {
    console.log(ctx.req.user);
    let userId: number = ctx.req.user.userId;
    console.log(userId);
    const patient = await this.findPatient(userId);
    Object.assign(patient, updateInput);
    return await patient.save();
  }
  async findPatient(id: number) {
    const patient = await this.userModel.findById(id);
    if (!patient || patient.roles.includes(UserRole.STAFF)) {
      throw new HttpException(
        `patient with id ${id} is not existed`,
        HttpStatus.NOT_FOUND,
      );
    }
    return patient;
  }

  async findById(id: string) {
    console.log(id);
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new HttpException(
        `user with id ${id} is not existed`,
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }

  generateCaseNumber() {
    return Math.floor(Math.random() * 9000) + 1000;
  }
  async setCookie(user: User, ctx) {
    let value = { userId: user._id, roles: user.roles };
    let token = this.generateToken(value);
    ctx.res.cookie('auth', token, {
      httpOnly: true,
      secure: true,
      maxAge: 2 * 60 * 60 * 1000,
    });
  }
  generateToken(payload: { userId: number; roles: string[] }) {
    return this.jwtService.sign(payload);
  }
}
