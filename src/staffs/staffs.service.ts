import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserRole } from 'src/auth/models/user.model';
import { StaffInput } from './dto/staff.dto';
import { StaffUpdateInput } from './dto/staff.update';
import { Salary } from 'src/salary/model/salary.model';
import { DateInput } from './dto/date.dto';
import { GetStaffInput } from './dto/getstaff.dto';
import { Appointment } from 'src/appointment/model/appointment.model';
import { months } from 'src/common/month';
import { statuses } from 'src/appointment/model/appointment.model'

@Injectable()
export class StaffsService {
    constructor(@InjectModel(User.name) private userModel:Model<User>,
    @InjectModel(Appointment.name) private appointmentModel:Model<Appointment>){}
   
    async create(staffInput:StaffInput):Promise<User> {
     const exist=await this.userModel.findOne({email:staffInput.email})
     if(exist && exist.roles.includes(UserRole.STAFF)) {
        throw new HttpException('this staff is already existed',HttpStatus.BAD_REQUEST)
     }else if(exist && !exist.roles.includes(UserRole.STAFF)){
      exist.roles.push(UserRole.STAFF)
      return await exist.save()
     }
     else{
        const staff=await this.userModel.create({...staffInput,roles:[UserRole.STAFF]})
        return await staff.save()
     }
        
    }
    async edit(id:string,staffInput:StaffUpdateInput) {
     try{
     let staff=await this.getOne(id)
     Object.assign(staff,staffInput)
     return await staff.save()}
     catch(err){
      throw new HttpException(err,err.status||HttpStatus.INTERNAL_SERVER_ERROR)
     }
    }
 
    async delete(staffId:string) {
        try{
        let staff:User=await this.getOne(staffId)
        console.log(staff)
        staff.roles.length>1?staff.roles.filter((r)=>r!==UserRole.STAFF):await staff.deleteOne()
       return await staff.save()}
       catch(err){
        throw new HttpException(err,err.status||HttpStatus.INTERNAL_SERVER_ERROR)
         }
        }
      
    async getAll() :Promise<User[]>  {
        return await this.userModel.find({roles:UserRole.STAFF})
    }
    
    async getOne(staffId:string):Promise<User>{
        let staff:User=await this.userModel.findById(staffId)
            if(!staff){
                throw new HttpException(`staff is not found with this id ${staffId}`,HttpStatus.NOT_FOUND)
            }
        return staff
    }
//     async paidStaff(bodyInput:DateInput){
//     const staffs=await this.salaryModel.find
//     ({isPayed:true,
//     year:bodyInput.year,
//     month:months[bodyInput.monthName]})
//     .populate('staff')
//     return staffs
// }
   async busyOnes(bodyInput:GetStaffInput) :Promise<User[]>{
    let startHour=bodyInput.hours
    const appointments=await this.appointmentModel.find
    ({startTime:{$eq:startHour}
        ,date:bodyInput.date,status:{$ne:statuses.TERMINATED}})
        .populate('staff')
    const staffs=appointments?.map((a)=>a.staff)
    return staffs;


    }

    async notBusyOnes(bodyInput:GetStaffInput):Promise<User[]>{
        const allStaffs=await this.userModel.find({roles:UserRole.STAFF})
        const busy=await this.busyOnes(bodyInput)
        if(!busy){
          return allStaffs
        }
        const notBusy=allStaffs.filter((staff)=>!busy.includes(staff))
        return notBusy;

    }

    async getByEmail(email:string) {
        const staff=await this.userModel.findOne({email:email})
        if(!staff) {
            throw new HttpException(`staff is not found with this email ${email}`,HttpStatus.NOT_FOUND)
        }
        return staff
    }

    async getByName(name:string){
        const [firstName,lastName]=name.split(' ')
        let match={}
         match['firstname']={ $regex: new RegExp(firstName, 'i') }; 
        if(lastName){
            match['lastname']={ $regex: new RegExp(lastName, 'i') }; 
        }
     const staffs=await this.userModel.aggregate([{
        $match:match
     }])
     console.log(staffs)
     return staffs
    }
    
}
   

