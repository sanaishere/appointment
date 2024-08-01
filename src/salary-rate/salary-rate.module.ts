import { Module } from '@nestjs/common';
import { SalaryRateService } from './salary-rate.service';
import { SalaryRateResolver } from './salary-rate.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { SalaryRate, salaryRateSchema } from './model/salary-rate.model';

@Module({
  imports:[MongooseModule.forFeature([{name:SalaryRate.name,schema:salaryRateSchema}])],
  providers: [SalaryRateService, SalaryRateResolver]
})
export class SalaryRateModule {}
