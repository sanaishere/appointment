import { InputType, OmitType } from "@nestjs/graphql";
import { SignUpInput } from "src/auth/dtos/signup.dto";
@InputType()
export class StaffInput extends OmitType(SignUpInput,['illness']){}