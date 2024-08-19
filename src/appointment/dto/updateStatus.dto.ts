import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { statuses } from "../model/appointment.model";
import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UpdateAppointmentStatus {
    @Field()
    @IsNotEmpty()
    @IsEnum(statuses)
    status:string
}