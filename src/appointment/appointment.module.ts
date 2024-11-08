import { Module } from '@nestjs/common';
import { AppointmentResolver } from './appointment.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Appointment, appointmentSchema } from './model/appointment.model';
import { AppointmentService } from './appointment.service';
import { StaffsModule } from 'src/staffs/staffs.module';
import { forwardRef } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { AuthModule } from 'src/auth/auth.module';
import { LeaveModule } from 'src/leaveRequest/leave.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Appointment.name, schema: appointmentSchema },
    ]),
    forwardRef(() => StaffsModule),
    AuthModule,
    LeaveModule,
  ],
  providers: [AppointmentResolver, AppointmentService],
  exports: [MongooseModule, AppointmentService],
})
export class AppointmentModule {}
