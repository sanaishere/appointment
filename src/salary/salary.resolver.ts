import { Args, Mutation, Resolver,Query, Context } from '@nestjs/graphql';
import { Salary } from './model/salary.model';
import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { SalaryInput } from './dto/salary.get.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { AdminGuard } from 'src/common/admin.guard';
import { EvaluateInput } from './dto/newSalary.dto';
import { SalaryService } from './salary.service';

@Resolver()
export class SalaryResolver {
    constructor(private salaryService:SalaryService){}
    @UseGuards(AuthGuard)
    @Mutation(()=>Salary,{name:'evaluate'})
    async evaluate(@Args('salaryInput') salaryInput:EvaluateInput,@Context() ctx,
   ){
        return await this.salaryService.evaluate(salaryInput,ctx.req.user)
    }
   

    @UseGuards(AuthGuard,AdminGuard)
    @Query(()=>Salary,{name:'getsalaries'})
    async getSalaries(@Args('getSalaryInput') salaryInput:SalaryInput) {
      return await this.salaryService.getSalaries()
    }

    @UseGuards(AuthGuard,AdminGuard)
    @Query(()=>Salary,{name:'getSalaryOfUser'})
    async getSalariesOfUser(@Args('getSalaryInput') salaryInput:SalaryInput) {

    }

    
}
