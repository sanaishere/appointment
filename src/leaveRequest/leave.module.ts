import { Module } from '@nestjs/common';
import { LeaveResolver } from './leave.resolver';
import { LeaveService } from './leave.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LeaveRequest, leaveRequestSchema } from './Model/leaveRequest.model';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[MongooseModule.forFeature([{name:LeaveRequest.name,schema:leaveRequestSchema}]),
  AuthModule
],
  providers: [LeaveResolver, LeaveService],
  exports:[LeaveService]
})
export class LeaveModule {}
