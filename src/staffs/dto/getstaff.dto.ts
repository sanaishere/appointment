import { Field, InputType } from '@nestjs/graphql';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { SignUpInput } from 'src/auth/dtos/signup.dto';
@InputType()
export class GetStaffInput {
  @Field()
  @IsNotEmpty()
  @IsDateString()
  date: string;

  @Field()
  @IsNotEmpty()
  @Min(9)
  @Max(20)
  hours: number;

  // @Field()
  // @IsNotEmpty()
  // @Min(0)
  // @Max(59)
  // minutes:number
}
