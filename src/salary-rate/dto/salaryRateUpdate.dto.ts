import { InputType, PartialType } from "@nestjs/graphql";
import { SalaryRateInput } from "./salaryRate.dto";

@InputType()
export class SalaryRateUpdate extends PartialType(SalaryRateInput){}