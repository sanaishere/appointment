import { Module } from '@nestjs/common';
import { PatientResolver } from './patient.resolver';
import { PatientService } from './patient.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [PatientResolver, PatientService],
})
export class PatientModule {}
