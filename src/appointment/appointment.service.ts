import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Appointment } from './model/appointment.model';
import { Model } from 'mongoose';

@Injectable()
export class AppointmentService {
    constructor(@InjectModel(Appointment.name) private Appointment:Model<Appointment>){

    }
    
}
