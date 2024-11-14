import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { EmailVerificationService } from './email-verification.service';
import { EmailVerificationDto } from './email-verification.dto';

@Controller('/api/auth/email-verification')
export class EmailVerificationController {
  constructor(
    private readonly emailVerificationService: EmailVerificationService,
  ) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() emailVerificationDto: EmailVerificationDto) {
    return this.emailVerificationService.emailVerification(
      emailVerificationDto,
    );
  }
}
