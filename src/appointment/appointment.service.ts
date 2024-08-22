import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Appointment, statuses } from './model/appointment.model';
import mongoose, { Model } from 'mongoose';
import { AppointmentInput } from './dto/appointment.dto'
import { User } from 'src/auth/models/user.model';
import { StaffsService } from 'src/staffs/staffs.service';
import { UpdateStaffAppointment } from './dto/updateStaffAppointment.dto';
import * as jalali from 'jalaali-js';
import { StaffFreeHours } from './output/staffEmptyHour';
import { UpdateAppointmentStatus } from './dto/updateStatus.dto';
import { GetMontlyInput } from './dto/getMonthly.dto';
import { LeaveService } from 'src/leaveRequest/leave.service';

const logger=new Logger('transactions')

require('dotenv').config()
@Injectable()
export class AppointmentService {
    constructor(@InjectModel(Appointment.name) private appointmentModel:Model<Appointment>,
    @InjectConnection() private readonly connection: mongoose.Connection,
    private staffService:StaffsService,
    private leaveService:LeaveService
  ){
     
    }
    async getByStaffIdMonthly(input:GetMontlyInput) {
      let monthFormat=input.month>9?input.month:`0${input.month}`
      const date=`${input.year}-${monthFormat}`
      const appintments=await this.appointmentModel.aggregate([{
        $match:{
          date:{
          $regex:new RegExp(date )
          }
          ,
          staff:input.staffId
          ,status:'terminated'
        },

      }])
      console.log("appointments",appintments)
      return appintments
    }

    async getByPatients(patient:User,input:AppointmentInput): Promise<Appointment>{
       return await this.appointmentModel.findOne({
        patient:patient._id,
        startTime:input.hours,
        date:input.date
      }
        
    )
    }

    async appointmentReq(input:AppointmentInput,user:User) {
      let appointment=await this.getByPatients(user,input)
      const session = await this.connection.startSession();
      session.startTransaction()
      let startTime=input.hours
      try{
      if(appointment){
        throw new HttpException('you already have appointment at this date,time',HttpStatus.BAD_REQUEST)
      }
      
      const staffsFreeNow=await this.getFreeStaffs(input)
      if(staffsFreeNow.length===0){
        throw new HttpException('there are no staffs free at this time',HttpStatus.NOT_FOUND)
      }
      const randomStaff=this.createRandomStaff(staffsFreeNow)
      let newAppointment=await this.appointmentModel.create
      ([{staff:randomStaff._id
        ,patient:user._id,
        startTime,
        date:input.date,
        status:statuses.PENDING}],{session})

        await session.commitTransaction()
        session.endSession()
        return newAppointment[0].populate('staff patient')
        
      }
      catch(err){
        await session.abortTransaction();
        session.endSession();
        throw new HttpException(err,err.status||HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }

     async delete(appointmentId:string) {
      const appointment=await this.findById(appointmentId)
      return  await appointment.deleteOne()
      

     }
     async update(appointmentId:string,input:UpdateStaffAppointment,user:User){
      let appointment=await this.findById(appointmentId)
      let staff=await this.staffService.getByEmail(input.email)
      const session=await this.connection.startSession()
      session.startTransaction()
      try{
        const staffsFree=await this.getFreeStaffs({date:appointment.date,hours:appointment.startTime})
        if(!staffsFree.includes(staff)){
          throw new HttpException('this staff would be busy on this time',HttpStatus.BAD_REQUEST)
        }
       let updatedAppointment=await this.appointmentModel.findByIdAndUpdate
       (appointmentId,
        {staff:staff._id,lastUpdater:user._id,lastUpdate:new Date()},
        {new:true})
       await updatedAppointment.save({session})
       await session.commitTransaction()
      session.endSession()
      }catch(err){
        await session.abortTransaction();
        session.endSession();
        throw new HttpException(err,err.status||HttpStatus.INTERNAL_SERVER_ERROR)
      }

     }

     async findById(id:string):Promise<Appointment>{
      const appointment=await this.appointmentModel.findById(id)
      if(!appointment){
        throw new HttpException(`there is no appointment with this id ${id}`,HttpStatus.BAD_REQUEST)
      }
      return appointment
     }
     async getByStaffAndDate(dayDate:string,staffId:string):Promise<Appointment[]> {
      
      const appintments=await this.appointmentModel.aggregate([{
        $match:{date:dayDate,staff:staffId},

      }])
      return appintments
    }

     async todayFreeTimesOfStaff(name:string,date:string){
      let dayDate=date?date:this.getDayDate()
      let hours=[9,10,11,12,13,14,15,16,17,18,19,20]
      let staffFreeHours:StaffFreeHours[]=[]
      const staffs:User[]=await this.staffService.getByName(name)
      for( let staff of staffs ){
        let appointmentHours=(await this.getByStaffAndDate(dayDate,staff._id)).map(a=>a.startTime)
        let emotyHours=appointmentHours.length>0?hours.filter((h)=>!appointmentHours.includes(h)):hours
        staffFreeHours.push({staffId:staff._id,emptyHours:emotyHours})
        console.log(staffFreeHours)
    }
    return {staffFreeHours,date:dayDate}
    
     }

     async getByUser(user:User){
     const appointment=await this.appointmentModel.find({patient:user._id})
     console.log(appointment)
     return appointment||[]
     }

     async updateStatus(appointentId:string,input:UpdateAppointmentStatus,user:User) {
      const appointment=await this.findById(appointentId)
      if(appointment.staff!==user._id){
        throw new HttpException('you cannot change this appointment',HttpStatus.BAD_REQUEST)
      }
      Object.assign(appointment,input,{lastUpdater:user,lastUpdate:new Date()})
      return await appointment.save()

     }

     async getFreeStaffs(input:AppointmentInput):Promise<User[]>{
      const staffsWithNoAppintment=await this.staffService.notBusyOnes(input)
      const staffsOnLeave=await this.leaveService.checkIfStaffOnLeave(input.date,input.hours)
      const staffsFree=staffsWithNoAppintment.filter((s)=>!staffsOnLeave.includes(s))
       return staffsFree
     }

      createRandomStaff(staffsFreeNow:User[]) {
      const randomIndex=Math.floor(Math.random()*staffsFreeNow.length)+0
      const randomStaff=staffsFreeNow[randomIndex]
      return randomStaff
     }

      getDayDate() {
      let dateSpecified=new Date()
      let tojalali=jalali.toJalaali(
        dateSpecified.getFullYear(),
        dateSpecified.getMonth()+1,
        dateSpecified.getDate())
      let dayDate=
      `${tojalali.jy}-${tojalali.jm.toString().padStart(2, '0')}-${tojalali.jd.toString().padStart(2, '0')}`
      return dayDate
     }
      
  
}
