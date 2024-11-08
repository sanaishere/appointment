import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { StaffGuard } from 'src/leaveRequest/guards/staff.guard';
import { LeaveRequest } from './Model/leaveRequest.model';
import { RequestInput } from './dtos/create.dto';
import { LeaveService } from './leave.service';
import { UpdateRequestInput } from './dtos/update.dto';
import { UpdateLeaveStatus } from './dtos/updateByAdmin.dto';
import { AdminGuard } from 'src/common/admin.guard';

@Resolver()
export class LeaveResolver {
  constructor(private leaveService: LeaveService) {}
  @UseGuards(AuthGuard, StaffGuard)
  @Mutation(() => LeaveRequest, { name: 'requestLeave' })
  async requestToLeave(@Args('reqInput') input: RequestInput, @Context() ctx) {
    return await this.leaveService.requestToLeave(input, ctx.req.user);
  }

  @UseGuards(AuthGuard, StaffGuard)
  @Mutation(() => LeaveRequest, { name: 'updateRequest' })
  async updateRequest(
    @Args('reqInput') input: RequestInput,
    @Args('id') id: string,
  ) {
    return await this.leaveService.updateRequestLeave(id, input);
  }

  @UseGuards(AuthGuard, StaffGuard)
  @Mutation(() => LeaveRequest, { name: 'deleteRequest' })
  async deleteRequest(@Args('id') id: string) {
    return await this.leaveService.deleteRequest(id);
  }

  @UseGuards(AuthGuard)
  @Query(() => LeaveRequest, { name: 'myRequests' })
  async getMyRequests(@Context() ctx) {
    return await this.leaveService.getRequestOfUser(ctx.req.user._id);
  }

  @UseGuards(AuthGuard)
  @Query(() => LeaveRequest, { name: 'getUserRequests' })
  async getUserRequests(@Args('id') id: string) {
    return await this.leaveService.getRequestOfUser(id);
  }

  @UseGuards(AuthGuard, AdminGuard)
  @Mutation(() => LeaveRequest, { name: 'updateStatus' })
  async updateStatusByAdmin(
    @Args('status') status: UpdateLeaveStatus,
    @Args('id') id: string,
  ) {
    return await this.leaveService.updateStatusByAdmin(status, id);
  }

  @UseGuards(AuthGuard, AdminGuard)
  @Query(() => [LeaveRequest])
  async getAllRequests() {
    return await this.leaveService.getAllRequests();
  }

  @UseGuards(AuthGuard, AdminGuard)
  @Query(() => [LeaveRequest])
  async getPendingRequests() {
    return await this.leaveService.getPendingRequests();
  }
}
