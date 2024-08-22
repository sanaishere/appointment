import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Salary } from './model/salary.model';
import { Model } from 'mongoose';
import { User, UserRole } from 'src/auth/models/user.model';
import { SalaryRateService } from 'src/salary-rate/salary-rate.service';
import { AppointmentService } from 'src/appointment/appointment.service';
import { months } from 'src/common/month';
import { SalaryInput } from './dto/salary.get.dto';


@Injectable()
export class SalaryService {
    constructor(@InjectModel(Salary.name) private salaryModel:Model<Salary>,
    @InjectModel(User.name) private userModel:Model<User>,
private salaryRateService:SalaryRateService,
private appointmentService:AppointmentService){}

    async evaluate({month,year},staff:User) {
        if(!staff.roles.includes(UserRole.STAFF)) {
            throw new HttpException('you are not staff to get salary',HttpStatus.BAD_REQUEST)
        }
        const monthNumber=months[month]
       const salary=await this.findOne(monthNumber,year)
       if(!salary){
      const newSalary=  await this.create(monthNumber,staff,year)
      return newSalary
       }
       else{
       const updateSalary=await this.increaseSalary(salary,staff)
       return updateSalary;
       }

        
    }

    async create(month:number,staff:User,year:number) {
       const getRate=(await this.salaryRateService.getPerYear(year)).incomePerPatient
       const appointments=await this.appointmentService.getByStaffIdMonthly({month,year,staffId:staff._id})
       const count=appointments.length
       const totalSalary=count*getRate
       const salary=await this.salaryModel.create({month:month,year:year,
        income:totalSalary,staff:staff,isPayed:false
       })
       return await salary.save()
    }
    async increaseSalary(salary:Salary,staff:User) {
        const getRate=(await this.salaryRateService.getPerYear(salary.year)).incomePerPatient
        const appointments=await this.appointmentService.getByStaffIdMonthly({month:salary.month,year:salary.year,staffId:staff._id})
        const count=appointments.length
        const totalSalary=count*getRate
        Object.assign(salary,{income:totalSalary})
        return await salary.save()

    }

    async findOne(month:number,year:number) {
     const salary=await this.salaryModel.findOne({month:month,year:year})
     return salary
    }

    async getSalaries() {
        return await this.salaryModel.find({})
    }

    async getSalariesOfUser(input:SalaryInput) {
      const salary=await this.salaryModel.findOne({
        year:input.year,
        month:input.month,
        staff:input.staffId
      })
      return salary
    }
}
