import { Module } from '@nestjs/common';
import { SalaryResolver } from './salary.resolver';
import { SalaryService } from './salary.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Salary, salarySchema } from './model/salary.model';

@Module({
  imports:[MongooseModule.forFeature([{name:Salary.name,schema:salarySchema}])],
  providers: [SalaryResolver, SalaryService]
})
export class SalaryModule {}
