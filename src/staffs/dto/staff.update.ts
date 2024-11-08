import { InputType, PartialType } from '@nestjs/graphql';
import { StaffInput } from './staff.dto';
@InputType()
export class StaffUpdateInput extends PartialType(StaffInput) {}
