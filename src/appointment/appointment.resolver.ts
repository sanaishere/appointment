import { Args, Context, Mutation, Resolver,Query } from '@nestjs/graphql';
import { AppointmentService } from './appointment.service';
import { Appointment } from './model/appointment.model';
import {  UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { PatientGuard } from './guards/patient.guard';
import { GetStaffInput } from 'src/staffs/dto/getstaff.dto';
import { AdminGuard } from 'src/common/admin.guard';
import { DeleteAppointmentGuard } from './guards/appointmentRequest.guard';
import { UpdateAppointment } from './dto/adminchange.dto';
import { StaffHoursRes } from './output/staffEmptyHour';
import { AppointmentInput } from './dto/req.dto';
import { UpdateStatus } from './dto/updateStatus.dto';

@Resolver()
export class AppointmentResolver {
    constructor(private appointmentService:AppointmentService){ }
    @UseGuards(AuthGuard,PatientGuard)
    @Mutation(()=>Appointment,{name:'requestAppointment'})
    async create(@Args('input') input:AppointmentInput,@Context() ctx) {
      return await this.appointmentService.appointmentReq(input,ctx.req.user)
    }

    @UseGuards(AuthGuard,AdminGuard)
    @Mutation(()=>Appointment,{name:'updateAppointment'})
    async update(@Args('id') appointmentId:string,@Args('input') input:UpdateAppointment,@Context() ctx) {
      return await this.appointmentService.update(appointmentId,input,ctx.req.user)
    }

    @UseGuards(AuthGuard,AdminGuard)
    @Mutation(()=>Appointment,{name:'updateAppointment'})
    async updateStatus(@Args('id') appointmentId:string,@Args('input') input:UpdateStatus,@Context() ctx) {
      return await this.appointmentService.updateStatus(appointmentId,input,ctx.req.user)
    }

    @UseGuards(AuthGuard,DeleteAppointmentGuard)
    @Mutation(()=>Appointment,{name:'deleteAppointment'})
    async delete(@Args('id') appointmentId:string){
     return await this.appointmentService.delete(appointmentId)

    }

    @Query(()=>[Appointment],{name:'getDaily'})
    async getDailyByStaffId(@Args('staffId')staffId:string,@Args('date') date:string){
      return await this.appointmentService.getByStaffIdDaily(date,staffId)
    } 
 
    @Query(()=>StaffHoursRes,{name:'freeTimes'})
    async todayFreeTimesOfStaff(@Args('staffName') staffName:string){
     return await this.appointmentService.todayFreeTimesOfStaff(staffName)
    }

    @UseGuards(AuthGuard)
    @Query(()=>[Appointment],{name:'getByUser'})
    async getByUser(@Context() ctx){
     return await this.appointmentService.getByUser(ctx.req.user)
    }
}