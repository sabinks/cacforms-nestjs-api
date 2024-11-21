import {
  Body,
  Controller,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { EmailVerificationService } from './email-verification.service';
import { EmailVerificationDto } from './email-verification.dto';
import { Response } from 'express';

@Controller('/api/auth/email-verification')
export class EmailVerificationController {
  constructor(
    private readonly emailVerificationService: EmailVerificationService,
  ) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(
    @Body() emailVerificationDto: EmailVerificationDto,
    @Res() response: Response,
  ) {
    this.emailVerificationService.emailVerification(emailVerificationDto);
    return response
      .status(200)
      .send({ message: 'Email verification completed!' });
  }
}
