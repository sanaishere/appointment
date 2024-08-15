import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
@InputType()
export class PatientInput{
    @Field()
    @IsOptional()
    year:number
    
    @Field()
    @IsOptional()
    @IsString()
    month:string

    @Field()
    @IsOptional()
    day:number
}