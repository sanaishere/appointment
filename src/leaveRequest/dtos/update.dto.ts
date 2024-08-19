import { InputType } from "@nestjs/graphql";
import { PartialType } from "@nestjs/swagger";
import { RequestInput } from "./create.dto";

@InputType()
export class UpdateRequestInput extends PartialType(RequestInput){}