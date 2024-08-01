import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

@InputType()
export class LoginInput {
@Field()
@IsNotEmpty({message:'email should not be empty'})
@IsEmail()
email:string

@Field()
@IsNotEmpty({message:'enter password'})
@IsString()
password:string

}