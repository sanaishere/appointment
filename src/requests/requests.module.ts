import { Module } from '@nestjs/common';
import { RequestsResolver } from './requests.resolver';
import { RequestsService } from './requests.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Request, requestSchema } from './model/request.model';

@Module({
  imports:[MongooseModule.forFeature([{name:Request.name,schema:requestSchema}])],
  providers: [RequestsResolver, RequestsService]
})
export class RequestsModule {}
