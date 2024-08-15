import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { statuses } from "../model/appointment.model";

export class UpdateStatus {
    @IsNotEmpty()
    @IsEnum(statuses)
    status:string
}