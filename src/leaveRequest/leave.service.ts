import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LeaveRequest, status } from './Model/leaveRequest.model';
import { Model } from 'mongoose';
import { User, userSchema } from 'src/auth/models/user.model';
import { RequestInput } from './dtos/create.dto';
import { UpdateRequestInput } from './dtos/update.dto';
import { UpdateLeaveStatus } from './dtos/updateByAdmin.dto';

@Injectable()
export class LeaveService {
  constructor(
    @InjectModel(LeaveRequest.name)
    private leaveRequestModel: Model<LeaveRequest>,
  ) {}

  async requestToLeave(input: RequestInput, user: User) {
    const existed = await this.checkStaffRequests(status.PENDING, user);
    if (existed.length > 0) {
      throw new HttpException(
        'you have one pending request',
        HttpStatus.BAD_REQUEST,
      );
    }
    let statusNow = status.PENDING;
    let createdDate = new Date().getDate();
    let hours = input.hours.split('-').map(Number);
    for (let i = 0; i < hours[1] - hours[0] - 1; i++) {
      hours.splice(i, 0, hours[0] + i + 1);
    }
    let leaveRequest = await this.leaveRequestModel.create({
      staff: user._id,
      hours,
      status: statusNow,
      createdDate,
      text: input.text,
      wantedDate: input.wantedDate,
    });
    return leaveRequest.save();
  }

  async checkStaffRequests(
    status: string,
    staff: User,
  ): Promise<LeaveRequest[]> {
    const requests = await this.leaveRequestModel.find({
      status: status,
      staff: staff._id,
    });
    return requests;
  }

  async updateRequestLeave(id: string, input: UpdateRequestInput) {
    const request = await this.findById(id);
    Object.assign(request, input);
    return await request.save();
  }

  async updateStatusByAdmin(status: UpdateLeaveStatus, id: string) {
    const request = await this.findById(id);
    Object.assign(request, { status: status });
    return await request.save();
  }

  async deleteRequest(id: string) {
    const request = await this.findById(id);
    if (request.status !== status.PENDING) {
      throw new HttpException(
        'you can not delete this',
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      await request.deleteOne();
      return request;
    } catch (err) {
      throw new HttpException(
        err,
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findById(id: string) {
    return await this.leaveRequestModel.findById(id);
  }

  async getRequestOfUser(userId: string) {
    const requests = await this.leaveRequestModel.find({ staff: userId });
    return requests;
  }
  async getAllRequests() {
    return await this.leaveRequestModel.find({});
  }

  async getPendingRequests() {
    return await this.leaveRequestModel.find({ status: status.PENDING });
  }

  async checkIfStaffOnLeave(date: string, time: number) {
    const staffs = await this.leaveRequestModel.aggregate([
      {
        $unwind: '$hours',
      },
      {
        $match: {
          hours: +time,
          wantedDate: date,
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'staff',
          foreignField: '_id',
          as: 'staff',
        },
      },
      {
        $project: {
          staff: 1,
        },
      },
    ]);
    console.log(staffs);
    return staffs;
  }
}
