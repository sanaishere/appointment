import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
@InputType()
export class SalaryRateInput{
    @Field()
    @IsNotEmpty()
    @IsNumber()
    year:number
    
    @Field()
    @IsNotEmpty()
    @IsNumber()
    income:number


}