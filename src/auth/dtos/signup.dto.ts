import { Field, InputType } from "@nestjs/graphql"
import { IsEmail, IsNotEmpty, IsString } from "class-validator"
@InputType()
export class SignUpInput{
@Field()
@IsNotEmpty({message:'enter firstname'})
@IsString()
firstname:string

@Field()
@IsNotEmpty({message:'enter lastname'})
@IsString()
lastname:string

@Field()
@IsNotEmpty({message:'email should not be empty'})
@IsEmail()
email:string

@Field()
@IsNotEmpty({message:'enter password'})
@IsString()
password:string

@Field()
@IsNotEmpty({message:'enter password'})
@IsString()
illness:string



}