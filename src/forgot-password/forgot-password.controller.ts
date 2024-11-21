import { Body, Controller, Post, Res } from '@nestjs/common';
import { ForgotPasswordDto } from './forgot-password.dto';
import { ForgotPasswordService } from './forgot-password.service';
import { Response } from 'express';

@Controller('api')
export class ForgotPasswordController {
  constructor(private readonly forgotPasswordService: ForgotPasswordService) {}

  @Post('forgot-password')
  resetPassword(
    @Body() forgotPasswordDforgot: ForgotPasswordDto,
    @Res() response: Response,
  ) {
    this.forgotPasswordService.resetPassword(forgotPasswordDforgot);
    return response.status(200).send({
      message: 'Password reset mail sent, please check your email inbox!',
    });
  }
}
