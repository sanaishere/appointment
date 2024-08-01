import { Prop,Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose from "mongoose"
import { User } from "src/auth/models/user.model"

enum status {
    PENDING="pending",
    INPROGRESS="in progress",
    TERMINATED="terminated"
}
@Schema()
export class Appointment {
    @Prop({required:true})
    startTime:number

    @Prop({required:true})
    date:Date
    
    @Prop()
    text:string

    @Prop({required:true,type:mongoose.Schema.Types.ObjectId,ref:'User'})
    patient:User

    @Prop({required:true,type:mongoose.Schema.Types.ObjectId,ref:'User'})
    staff:User

    @Prop({required:true})
    status:status

}

export const appointmentSchema=SchemaFactory.createForClass(Appointment)
