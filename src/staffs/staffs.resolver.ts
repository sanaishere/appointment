import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StaffsService } from './staffs.service';
import { User } from 'src/auth/models/user.model';
import { StaffInput } from './dto/staff.dto';
import { StaffUpdateInput } from './dto/staff.update';
import { GetStaffInput } from './dto/getstaff.dto';
import { DateInput } from './dto/date.dto';
import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/common/admin.guard';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { validate } from 'src/common/validateId';

@Resolver()
export class StaffsResolver {
  constructor(private staffService: StaffsService) {}
  @UseGuards(AuthGuard, AdminGuard)
  @Mutation(() => User, { name: 'createStaff' })
  async create(@Args('staffInput') staffInput: StaffInput) {
    return await this.staffService.create(staffInput);
  }
  @UseGuards(AuthGuard, AdminGuard)
  @Mutation(() => User, { name: 'editStaff' })
  async update(
    @Args('staffInput') staffUpdateInput: StaffUpdateInput,
    @Args('id') id: string,
  ) {
    const valid = validate(id);
    if (valid) {
      return await this.staffService.edit(id, staffUpdateInput);
    }
  }
  @UseGuards(AuthGuard, AdminGuard)
  @Mutation(() => User, { name: 'deletStaff' })
  async delete(@Args('id') staffId: string) {
    const valid = validate(staffId);
    if (valid) {
      return await this.staffService.delete(staffId);
    }
  }
  @UseGuards(AuthGuard, AdminGuard)
  @Query(() => [User], { name: 'getStaffs' })
  async getAll() {
    return await this.staffService.getAll();
  }

  @UseGuards(AuthGuard, AdminGuard)
  @Query(() => User, { name: 'getStaff' })
  async getOne(@Args('id') staffId: string) {
    return await this.staffService.getOne(staffId);
  }

  @UseGuards(AuthGuard, AdminGuard)
  @Query(() => [User], { name: 'busyStaffs' })
  async getBusyOnes(@Args('input') bodyInput: GetStaffInput) {
    return await this.staffService.busyOnes(bodyInput);
  }

  @UseGuards(AuthGuard, AdminGuard)
  @Query(() => [User], { name: 'freeStaffs' })
  async getNotBusyOnes(@Args('input') bodyInput: GetStaffInput) {
    return await this.staffService.notBusyOnes(bodyInput);
  }

  @UseGuards(AuthGuard, AdminGuard)
  @Query(() => [User], { name: 'staffsOnLeave' })
  async staffOnLeave(@Args('input') bodyInput: GetStaffInput) {}

  // @UseGuards(AuthGuard,AdminGuard)
  // @Query(()=>[User],{name:'paidStaffs'})
  // async PaidStaff(@Args('input') bodyInput:DateInput){
  //    return await this.staffService.paidStaff(bodyInput)
  // }
}
