import { Module } from '@nestjs/common';
import { AppointmentResolver } from './appointment.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Appointment, appointmentSchema } from './model/appointment.model';
import { AppointmentService } from './appointment.service';

@Module({
  imports:[MongooseModule.forFeature([{name:Appointment.name,schema:appointmentSchema}])],
  providers: [AppointmentResolver,AppointmentService]
})
export class AppointmentModule {}
