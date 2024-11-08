import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/auth/models/user.model';
@ObjectType()
@Schema()
export class Salary extends Document {
  @Field((type) => ID)
  _id?: number;

  @Prop({ required: true, type: 'number' })
  month: number;

  @Prop({ required: true, type: 'number' })
  year: number;

  @Prop({ required: true })
  income: number;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  staff: User;

  @Prop()
  isPayed: boolean;
}

export const salarySchema = SchemaFactory.createForClass(Salary);
