import { ObjectType, Field, Int } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@ObjectType()
export class StaffFreeHours {
  @Field()
  staffId?:string

  @Field(()=>[Int])
  emptyHours?:number[]
}

@ObjectType()
export class StaffHoursRes {
  @Field(()=>[StaffFreeHours])
  staffHours?:StaffFreeHours[]
  @Field()
  date: string;
}



