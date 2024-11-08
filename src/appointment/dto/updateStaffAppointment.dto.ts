import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';
@InputType()
export class UpdateStaffAppointment {
  @Field()
  @IsNotEmpty()
  @IsString()
  email: string;
}
