import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  BadRequestException,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { Request, Response } from 'express';
import { sendResponse } from './responseFormat';
import {
  Context,
  GqlArgumentsHost,
  GqlExecutionContext,
} from '@nestjs/graphql';
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = GqlArgumentsHost.create(host).getContext();
    let response = ctx.res;
    const status = exception.getStatus();
    console.log('exception:', exception);
    const responseToSend = sendResponse(
      {
        error_code: status,
        error_message: exception.message,
        errors: exception['response'],
      },
      '',
    );
    console.log('response', responseToSend);

    response.status(status).send(responseToSend);
  }
}
