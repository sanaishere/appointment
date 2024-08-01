import { OmitType } from "@nestjs/graphql";
import { SignUpInput } from "src/auth/dtos/signup.dto";

export class StaffInput extends OmitType(SignUpInput,['illness']){}