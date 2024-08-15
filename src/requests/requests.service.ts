import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request, status, types } from './model/request.model';
import { Model } from 'mongoose';

import { User } from 'src/auth/models/user.model';
import jalali from 'jalaali-js';

@Injectable()
export class RequestsService {
    constructor(@InjectModel(Request.name) private requestModel:Model<Request>){ }

    // async leaveReq(input:ReqInput,user:User){
    //     const existed=await this.findStatus(status.PENDING)
    //     if(existed.length>0){
    //       throw new HttpException('you have one pending request',HttpStatus.BAD_REQUEST)
    //     }
    //     let type=types.LEAVE
    //     let state=status.PENDING
    //     let createdDate=new Date().getDate()

    //     let request=await this.requestModel.create
    //     ({user:user,hours:input.hours,status:state,createdDate,type,text:input.text,wantedDate:input.wantedDate})
    //     return request.save()
    // }
    async findStatus(status:string):Promise<Request[]> {
        const requests=await this.requestModel.find({status:status})
        return requests
    }

    async updateStatus(status:string,request:Request) {
       Object.assign(request,{status:status})
       return await request.save()
    }

    async deleteRequest(id:string) {
     const request=await this.findById(id)
     if(request.status!==status.PENDING){
        throw new HttpException('you can not delete this',HttpStatus.BAD_REQUEST)
     }
     try{

       await request.deleteOne()
       return request
     }catch(err){
        throw new HttpException(err,err.status||HttpStatus.INTERNAL_SERVER_ERROR)
     }

    }

    async findById(id:string){
    return await this.requestModel.findById(id)
    }

    async getRequestOfUser(user:User) {
        const requests=await this.requestModel.find({user:user})
        return requests 

    }
    async getRequests() {
        return await this.requestModel.find({})
    }
}
