import { Module } from '@nestjs/common';
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
@Module({
  imports: [GraphQLModule.forRoot<ApolloDriverConfig>({
    driver:ApolloDriver,
    autoSchemaFile:join(process.cwd(),'src/schema.gql'),
    context: ({ req, res }) => ({ req, res }),
  }),StaffsModule, PatientModule, AppointmentModule, RequestsModule, LeaveModule, SalaryRateModule, SalaryModule,
    MongooseModule.forRoot('mongodb+srv://sanafaraji82:sana8080@cluster0.uiwnv5x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService,],
})
export class AppModule {}
