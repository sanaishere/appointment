import { ObjectType, Field, Int } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@ObjectType()
export class StaffHours {
  @Field()
  staffId?:string

  @Field(()=>[Int])
  emptyHours?:number[]
}

@ObjectType()
export class StaffHoursRes {
  @Field(()=>[StaffHours])
  staffHours?:StaffHours[]
  @Field()
  date: string;
}



