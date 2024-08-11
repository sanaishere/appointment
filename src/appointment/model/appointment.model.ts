import { ObjectType } from "@nestjs/graphql"
import { Prop,Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose, { Document } from "mongoose"
import { User } from "src/auth/models/user.model"


export enum statuses {
    PENDING="pending",
    INPROGRESS="in progress",
    TERMINATED="terminated"
}
@ObjectType()
@Schema()
export class Appointment extends Document  {
    @Prop({required:true})
    startTime:number

    @Prop({required:true})
    date:string
    
    @Prop()
    text?:string

    @Prop({required:true,type:mongoose.Schema.Types.ObjectId,ref:'User'})
    patient:User

    @Prop({required:true,type:mongoose.Schema.Types.ObjectId,ref:'User'})
    staff:User

    @Prop({required:true,type:String,enum:Object.values(statuses)})
    status?:string

}

export const appointmentSchema=SchemaFactory.createForClass(Appointment)
