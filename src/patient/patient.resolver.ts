import { Context, Query, Resolver } from '@nestjs/graphql';
import { PatientService } from './patient.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { User } from 'src/auth/models/user.model';
import { AdminGuard } from 'src/common/admin.guard';

@Resolver()
export class PatientResolver {
  constructor(private patientService: PatientService) {}
  @UseGuards(AuthGuard)
  @Query(() => User, { name: 'me' })
  async getMe(@Context() ctx: { req: any }) {
    return await this.patientService.getById(ctx?.req?.userId);
  }

  @UseGuards(AuthGuard, AdminGuard)
  @Query(() => User, { name: 'getPatients' })
  async getPatients() {
    return this.patientService.getPatients();
  }
}
