import { Field, InputType } from '@nestjs/graphql';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';
import { User } from 'src/auth/models/user.model';

@InputType()
export class ByPatientInput {
  @Field()
  @IsNotEmpty()
  @IsDateString()
  date: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  timing: string;

  @Field()
  @IsNotEmpty()
  user: User;
}
