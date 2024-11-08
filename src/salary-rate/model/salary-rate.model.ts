import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@ObjectType()
@Schema()
export class SalaryRate extends Document {
  @Field((type) => ID)
  _id?: number;

  @Prop({ required: true, type: 'number' })
  year: number;

  @Prop({ required: true })
  incomePerPatient: number;
}

export const salaryRateSchema = SchemaFactory.createForClass(SalaryRate);
