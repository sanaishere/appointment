import { Module } from '@nestjs/common';
import { SalaryResolver } from './salary.resolver';
import { SalaryService } from './salary.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Salary, salarySchema } from './model/salary.model';
import { AuthModule } from 'src/auth/auth.module';
import { SalaryRateModule } from 'src/salary-rate/salary-rate.module';
import { AppointmentModule } from 'src/appointment/appointment.module';

@Module({
  imports:[MongooseModule.forFeature([{name:Salary.name,schema:salarySchema}]),
  AuthModule,SalaryRateModule,AppointmentModule],
  providers: [SalaryResolver, SalaryService],
  exports:[MongooseModule]
})
export class SalaryModule {}
