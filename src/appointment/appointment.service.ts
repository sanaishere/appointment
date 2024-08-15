import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Appointment, statuses } from './model/appointment.model';
import mongoose, { Model } from 'mongoose';
import { AppointmentInput } from './dto/getMonthly.dto';
import { User } from 'src/auth/models/user.model';
import { StaffsService } from 'src/staffs/staffs.service';
import { GetStaffInput } from 'src/staffs/dto/getstaff.dto';
import { UpdateAppointment } from './dto/adminchange.dto';
import * as jalali from 'jalaali-js';
import { StaffHours } from './output/staffEmptyHour';
import { UpdateStatus } from './dto/updateStatus.dto';

const logger=new Logger('transactions')

require('dotenv').config()
@Injectable()
export class AppointmentService {
    constructor(@InjectModel(Appointment.name) private appointmentModel:Model<Appointment>,
    @InjectConnection() private readonly connection: mongoose.Connection,
    private staffService:StaffsService){
     
    }
    async getByStaffIdMonthly(input:AppointmentInput) {
      const date=`${input.year}-${input.month}`
      const appintments=await this.appointmentModel.aggregate([{
        $match:{
          $regex:
            new RegExp(date )
          ,
          staff:{_id:input.staffId},status:'terminated'},

      }])
      return appintments
    }

    async getByPatients(patient:User,input:AppointmentInput) {
       
    }

    async appointmentReq(input:GetStaffInput,user:User) {
      const session = await this.connection.startSession();
      session.startTransaction()
      let startTime=input.hours
      try{
      let appointment=await this.appointmentModel.findOne
      ({patient:user._id,
        date:input.date,
        startTime:{$eq:startTime},
      status:{$ne:statuses.TERMINATED}}).session(session)
      console.log(appointment)
 
      if(appointment){
        throw new HttpException('you already have appointment at this date,time',HttpStatus.BAD_REQUEST)
      }
      const staffsFreeNow=await this.staffService.notBusyOnes(input)
      if(staffsFreeNow.length===0){
        throw new HttpException('there are no staffs free at this time',HttpStatus.NOT_FOUND)
      }
      const randomIndex=Math.floor(Math.random()*staffsFreeNow.length)+0
      const randomStaff=staffsFreeNow[randomIndex]
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
     async update(appointmentId:string,input:UpdateAppointment,user:User){
      let appointment=await this.findById(appointmentId)
      let staff=await this.staffService.getByEmail(input.email)
      const session=await this.connection.startSession()
      session.startTransaction()
      try{
        const staffsFree=await this.staffService.notBusyOnes({date:appointment.date,hours:appointment.startTime})
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
     async getByStaffIdDaily(todayDate:string,staffId:string):Promise<Appointment[]> {
      
      const appintments=await this.appointmentModel.aggregate([{
        $match:{date:todayDate,staff:staffId},

      }])
      return appintments
    }

     async todayFreeTimesOfStaff(name:string){
      let today=new Date()
      let tojalali=jalali.toJalaali(today.getFullYear(),today.getMonth()+1,today.getDate())
      let todayDate=`${tojalali.jy}-${tojalali.jm.toString().padStart(2, '0')}-${tojalali.jd.toString().padStart(2, '0')}`
      let hours=[9,10,11,12,13,14,15,16,17,18,19,20]
      let staffHours:StaffHours[]=[]
      const staffs:User[]=await this.staffService.getByName(name)
      for( let staff of staffs ){
        let appointmentHours=(await this.getByStaffIdDaily(todayDate,staff._id)).map(a=>a.startTime)
        let emotyHours=appointmentHours.length>0?hours.filter((h)=>!appointmentHours.includes(h)):hours
        staffHours.push({staffId:staff._id,emptyHours:emotyHours})
        console.log(staffHours)
    }
    return {staffHours,date:todayDate}
    
     }

     async getByUser(user){
     const appointment=await this.appointmentModel.find({patient:user._id})
     console.log(appointment)
     return appointment||[]
     }

     async updateStatus(appointentId:string,input:UpdateStatus,user:User) {
      const appointment=await this.findById(appointentId)
      if(appointment.staff!==user._id){
        throw new HttpException('you cannot change this appointment',HttpStatus.BAD_REQUEST)
      }
      Object.assign(appointment,input,{lastUpdater:user,lastUpdate:new Date()})
      return await appointment.save()

     }
      
  
}
