import { InputType, PartialType } from "@nestjs/graphql";
import { SignUpInput } from "./signup.dto";
@InputType()
export class UpdateInput extends PartialType(SignUpInput){}