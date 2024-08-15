import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";

@InputType()
export class EvaluateInput{
    @Field()
    @IsNotEmpty()
    @IsString()
    month:string
    
    @Field()
    @IsNotEmpty()
    year:number
    
    // @Field()
    // @IsNotEmpty()
    // @IsString()
    // email:string
}