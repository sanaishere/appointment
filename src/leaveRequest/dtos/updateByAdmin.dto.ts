import { IsEnum, IsNotEmpty } from 'class-validator';
import { status } from '../Model/leaveRequest.model';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateLeaveStatus {
  @Field()
  @IsNotEmpty()
  @IsEnum(status)
  status: string;
}
