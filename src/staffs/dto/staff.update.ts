import { PartialType } from "@nestjs/graphql";
import { StaffInput } from "./staff.dto";

export class StaffUpdateInput extends PartialType(StaffInput){}