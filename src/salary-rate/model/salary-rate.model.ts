import { Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
@Schema()
export class SalaryRate {
    @Prop({required:true,type:"number"})
    year:number
    
    @Prop({required:true})
    incomePerPatient:number


}

export const salaryRateSchema= SchemaFactory.createForClass(SalaryRate);