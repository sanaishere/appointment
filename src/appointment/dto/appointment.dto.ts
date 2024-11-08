import { Field, InputType } from '@nestjs/graphql';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
  validate,
} from 'class-validator';
import { SignUpInput } from 'src/auth/dtos/signup.dto';
import { IsNotInThePast } from 'src/common/decorators/checkDate.decorator';
import { IsNotInThePastTime } from 'src/common/decorators/checkHour.decorator';
@InputType()
export class AppointmentInput {
  @Field()
  @IsNotEmpty()
  @IsDateString()
  @IsNotInThePast()
  date: string;

  @Field()
  @IsNotEmpty()
  @Min(9)
  @Max(20)
  @IsNotInThePastTime()
  hours: number;
}
