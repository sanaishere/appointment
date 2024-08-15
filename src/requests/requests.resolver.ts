import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { RequestsService } from './requests.service';
import { Request } from './model/request.model';

import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { PatientGuard } from '../appointment/guards/patient.guard';
import { StaffGuard } from './guards/staff.guard';


@Resolver()
export class RequestsResolver {
    constructor(private requestService:RequestsService){}
    // @UseGuards(AuthGuard,PatientGuard)
    //  @Mutation(()=>Request,{name:'appointmentRequest'})
    // async appointmentReq(@Args('requestInput') input:ReqInput,@Context() ctx){
    //     return await this.requestService.appointmentReq(input,ctx.req.user)

    // }
    // @UseGuards(AuthGuard,StaffGuard)
    // @Mutation(()=>Request,{name:'leaveRequest'})
    // async leaveReq(@Args('requestInput') input:ReqInput,@Context() ctx){
    //     return await this.requestService.leaveReq(input,ctx.req.user)

    //}
}
