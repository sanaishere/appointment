import { Field, InputType } from "@nestjs/graphql"
import { IsNotEmpty, IsOptional, IsString } from "class-validator"

@InputType()
export class AppointmentInput{
 @Field()
 @IsNotEmpty()
 @IsString()
 month:number

 @Field()
@IsNotEmpty()
 year:number
@Field()
 @IsNotEmpty()
 staffId?:string


}