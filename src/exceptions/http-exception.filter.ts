import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  MethodNotAllowedException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { format } from 'date-fns';
import { Request, Response } from 'express';

@Catch(HttpException, BadRequestException)
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).json({
      response: status == 422 ? exception.getResponse() : exception.message,
      timestamp: format(new Date(), 'yyyy-MM-dd hh:mm:ss'),
      path: request.url,
    });
  }
}
