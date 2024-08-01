import { Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "src/auth/models/user.model";
@Schema()
export class Salary {
    @Prop({required:true,type:"number"})
    month:number

    @Prop({required:true,type:"number"})
    year:number
    
    @Prop({required:true})
    income:number

    @Prop({required:true,type:mongoose.Schema.Types.ObjectId,ref:'User'})
    staff:User

    @Prop()
    isPayed:boolean

}

export const salarySchema= SchemaFactory.createForClass(Salary);