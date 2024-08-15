import { Field, InputType } from "@nestjs/graphql";
import { IsOptional, IsString } from "class-validator";

@InputType()
export class SalaryInput{
 @Field()
 @IsOptional()
 @IsString()
 month:string
 
 @Field()
 @IsOptional()
 year:number

 @Field()
 @IsOptional()
 @IsString()
 staffName:string

}