import { Module } from '@nestjs/common';
import { StaffsResolver } from './staffs.resolver';
import { StaffsService } from './staffs.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { SalaryModule } from 'src/salary/salary.module';
import { AppointmentModule } from 'src/appointment/appointment.module';
import { forwardRef } from '@nestjs/common';
@Module({
  imports:[AuthModule,forwardRef(()=>AppointmentModule)],
  providers: [StaffsResolver, StaffsService],
  exports:[StaffsService]
})
export class StaffsModule {}
