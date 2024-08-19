import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StaffsModule } from './staffs/staffs.module';
import { PatientModule } from './patient/patient.module';
import { AppointmentModule } from './appointment/appointment.module';
import { LeaveModule } from './leaveRequest/leave.module';
import { SalaryRateModule } from './salary-rate/salary-rate.module';
import { SalaryModule } from './salary/salary.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';


require('dotenv').config()
@Module({
  imports: [GraphQLModule.forRoot<ApolloDriverConfig>({
    driver:ApolloDriver,
    autoSchemaFile:join(process.cwd(),'src/schema.gql'),
    
    context: ({ req, res }) => ({ req, res }),
    
   }),
  StaffsModule, PatientModule, AppointmentModule, LeaveModule, SalaryRateModule, SalaryModule, AuthModule,
  MongooseModule.forRoot('mongodb://localhost:27017/clinik',
     {
     
      
    }
    )
   
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
