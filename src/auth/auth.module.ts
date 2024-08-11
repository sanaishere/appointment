import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from 'src/auth/models/user.model';
import { PatientModule } from 'src/patient/patient.module';
import {JwtModule} from '@nestjs/jwt'
import {PassportModule} from '@nestjs/passport'
require('dotenv').config()
@Module({
  imports:[MongooseModule.forFeature([{name:User.name,schema:userSchema}]),
JwtModule.register({
  secret:process.env.JWT_SECRET,
  signOptions:{expiresIn:'2h'}
  
})],
  providers: [AuthService, AuthResolver],
  exports:[MongooseModule,JwtModule,AuthService]
})
export class AuthModule {}
