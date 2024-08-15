import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StaffsModule } from './staffs/staffs.module';
import { PatientModule } from './patient/patient.module';
import { AppointmentModule } from './appointment/appointment.module';
import { RequestsModule } from './requests/requests.module';
import { LeaveModule } from './leave/leave.module';
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
  StaffsModule, PatientModule, AppointmentModule, RequestsModule, LeaveModule, SalaryRateModule, SalaryModule, AuthModule,
  MongooseModule.forRoot(process.env.MONGO_URI,
     {
      serverSelectionTimeoutMS: 400000,
      socketTimeoutMS: 900000,
      connectTimeoutMS: 1200000,
     //minPoolSize:20,
      
    }
    )
   
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
