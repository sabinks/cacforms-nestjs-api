import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  MethodNotAllowedException,
  NotFoundException,
} from '@nestjs/common';
import { format } from 'date-fns';
import { Request, Response } from 'express';

@Catch(
  HttpException,
  NotFoundException,
  BadRequestException,
  MethodNotAllowedException,
)
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).json({
      message: exception.message,
      status,
      timestamp: format(new Date(), 'yyyy-MM-dd hh:mm:ss'),
      path: request.url,
    });
  }
}
