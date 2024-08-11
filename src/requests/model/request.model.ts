import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { User } from "src/auth/models/user.model";
import { JalaaliDateObject } from "jalaali-js";
export enum types {
    LEAVE= "LEAVE",
    APPOINTMENT= "APPOINTMENT"
 }
 export enum status {
    REJECTED= "rejected",
    ACCEPTED= "accepted",
    PENDING ="pending"
 }
 @ObjectType()
@Schema()
export class Request extends Document {
    @Field(()=>ID)
    _id?: unknown;

    @Prop({required:true})
    hours:string

    @Prop({required:true})
    wantedDate:Date

    @Prop({required:true})
    createdDate:Date
    
    @Prop()
    text?:string

    @Prop({required:true,type:mongoose.Schema.Types.ObjectId,ref:'user'})
    user:User

    @Prop({required:true,enum:Object.values(types),type:String})
    type:types

    @Prop({required:true,enum:Object.values(status),type:String})
    status:string

}

export const requestSchema= SchemaFactory.createForClass(Request);