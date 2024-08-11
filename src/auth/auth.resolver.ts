import { Args, Context, GqlExecutionContext, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User } from 'src/auth/models/user.model';
import { LoginInput } from './dtos/login.dto';
import { SignUpInput } from './dtos/signup.dto';
import { UpdateInput } from './dtos/update.dto';
import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { AuthGuard } from './guard/auth.guard';
import { Response } from 'express';

@Resolver()
export class AuthResolver {
    constructor(private authService:AuthService){}

    @Query(()=>String)
    async findAllUsers(){
      return ''
    }
    @Mutation(()=>User,{name:'login'})
    async patientLogin(@Args('login') loginInput:LoginInput,@Context() ctx: {res:Response}) {
     const user= await this.authService.login(loginInput)
    await this.authService.setCookie(user,ctx)
     return user;
    }

    @Mutation(()=>User,{name:'patientSignUp'})
    async patientSignUp(@Args('signup') signUpInput:SignUpInput,@Context() ctx: {res:Response}) {
       const patient=  await this.authService.patientSignUp(signUpInput)
       await this.authService.setCookie(patient,ctx)
       return patient
    }
    @UseGuards(AuthGuard)
    @Mutation(()=>User,{name:'patientUpdate'})
    async patientUpdate(@Args('update') updateInput: UpdateInput,@Context() ctx) {
        return await this.authService.changePatientInfo(updateInput,ctx)
    }

}
