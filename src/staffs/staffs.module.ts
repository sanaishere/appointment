import { Module } from '@nestjs/common';
import { StaffsResolver } from './staffs.resolver';
import { StaffsService } from './staffs.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[AuthModule],
  providers: [StaffsResolver, StaffsService]
})
export class StaffsModule {}
