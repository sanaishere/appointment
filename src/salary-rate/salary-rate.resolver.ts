import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SalaryRateService } from './salary-rate.service';
import { SalaryRate } from './model/salary-rate.model';
import { UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/common/admin.guard';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { SalaryRateInput } from './dto/salaryRate.dto';
import { SalaryRateUpdate } from './dto/salaryRateUpdate.dto';

@Resolver()
export class SalaryRateResolver {
    constructor(private salaryRateService:SalaryRateService){}
    @UseGuards(AuthGuard,AdminGuard)
    @Mutation(()=>SalaryRate)
    async create(@Args('salaryRateInput') salaryRateInput:SalaryRateInput){
     return this.salaryRateService.create(salaryRateInput)
    }

    @UseGuards(AuthGuard,AdminGuard)
    @Mutation(()=>SalaryRate)
    async edit(@Args('salaryRateUpdate') updateInput:SalaryRateUpdate,
    @Args('id') id:number){
      return this.salaryRateService.update(id,updateInput)
    }

    @Query(()=>SalaryRate)
    async getPerYear(@Args('year') year:number){
       return this.salaryRateService.getPerYear(year)
    }



}
