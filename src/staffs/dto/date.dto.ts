import { Field, InputType } from "@nestjs/graphql";
import { IsDateString, IsNotEmpty, IsString } from "class-validator";
@InputType()
export class DateInput{
    @Field()
    @IsNotEmpty()
    @IsString()
    monthName:string
    
    @Field()
    @IsNotEmpty()
    year:number
}