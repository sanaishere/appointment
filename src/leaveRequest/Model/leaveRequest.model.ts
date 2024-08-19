import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { User } from "src/auth/models/user.model";
import { JalaaliDateObject } from "jalaali-js";

 export enum status {
    REJECTED= "rejected",
    ACCEPTED= "accepted",
    PENDING ="pending"
 }
 @ObjectType()
@Schema()
export class LeaveRequest extends Document {
    @Field(()=>ID)
    _id?: unknown;

    @Prop({required:true})
    hours:number[]

    @Prop({required:true})
    wantedDate:string

    @Prop({required:true})
    createdDate:Date
    
    @Prop()
    text?:string

    @Prop({required:true,type:mongoose.Schema.Types.ObjectId,ref:'user'})
    staff:User

    @Prop({required:true,enum:Object.values(status),type:String})
    status:string

}

export const leaveRequestSchema= SchemaFactory.createForClass(LeaveRequest);