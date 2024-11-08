import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { Document } from 'mongoose';
export enum UserRole {
  ADMIN = 'admin',
  STAFF = 'staff',
  PATIENT = 'patient',
}
@ObjectType()
@Schema()
export class User extends Document {
  @Field(() => ID)
  _id?: any;

  @Prop({ required: true })
  firstname: string;

  @Prop({ required: true })
  lastname: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Field(() => [String])
  @Prop({ required: true, enum: Object.values(UserRole), type: [String] })
  roles: UserRole[];

  @Prop()
  caseNumber?: number;

  @Prop()
  illness?: string;
}
export const userSchema = SchemaFactory.createForClass(User);
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  }
});
