import { Field } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "src/auth/models/user.model";
enum types {
    LEAVE= "LEAVE",
    APPOINTMENT= "APPOINTMENT"
 }
@Schema()
export class Request {
    @Prop({required:true})
    hours:string

    @Prop({required:true})
    date:Date
    
    @Prop()
    text:string

    @Prop({required:true,type:mongoose.Schema.Types.ObjectId,ref:'user'})
    user:User
    @Field(()=>String)
    @Prop({required:true,enum:Object.values(types)})
    type:types

    @Prop()
    status:string

}

export const requestSchema= SchemaFactory.createForClass(Request);