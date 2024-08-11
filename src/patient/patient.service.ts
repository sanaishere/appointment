import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { User } from 'src/auth/models/user.model';
import { PatientInput } from './dto/patient.dto';

@Injectable()
export class PatientService {
    constructor(@InjectModel(User.name) private userModel:Model<User>){}
   async getById(id:number) :Promise<User>{
    const patient=await this.userModel.findById(id)
    if(!patient){
        throw new HttpException('patient with this id is not fund',HttpStatus.NOT_FOUND)
    }
    return patient
   }
   async getPatients() :Promise<User[]>{
    const patients=await this.userModel.find({roles:'patient'})
    return patients;
    
   }

   
}
