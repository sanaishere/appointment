import { Module } from '@nestjs/common';
import { SalaryRateService } from './salary-rate.service';
import { SalaryRateResolver } from './salary-rate.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { SalaryRate, salaryRateSchema } from './model/salary-rate.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SalaryRate.name, schema: salaryRateSchema },
    ]),
    AuthModule,
  ],
  providers: [SalaryRateService, SalaryRateResolver],
  exports: [MongooseModule, SalaryRateService],
})
export class SalaryRateModule {}
