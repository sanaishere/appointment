import { Field, InputType } from '@nestjs/graphql';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { IsNotInThePast } from 'src/common/decorators/checkDate.decorator';
import { IsNotInThePastTime } from 'src/common/decorators/checkHour.decorator';

@InputType()
export class RequestInput {
  @Field()
  @IsNotEmpty()
  @IsDateString()
  @IsNotInThePast()
  wantedDate: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @IsNotInThePastTime()
  hours: string;

  @Field()
  @IsOptional()
  @IsString()
  text: string;
}
