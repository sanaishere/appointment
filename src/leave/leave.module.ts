import { Module } from '@nestjs/common';
import { LeaveResolver } from './leave.resolver';
import { LeaveService } from './leave.service';

@Module({
  providers: [LeaveResolver, LeaveService]
})
export class LeaveModule {}
