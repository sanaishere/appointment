import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from 'src/auth/models/user.model';
import {JwtModule} from '@nestjs/jwt'

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
