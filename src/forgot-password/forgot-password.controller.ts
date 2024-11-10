import { Body, Controller, Post } from '@nestjs/common';
import { ForgotPasswordDto } from './forgot-password.dto';
import { ForgotPasswordService } from './forgot-password.service';

@Controller('api')
export class ForgotPasswordController {
  constructor(private readonly forgotPasswordService: ForgotPasswordService) {}

  @Post('forgot-password')
  resetPassword(@Body() forgotPasswordDforgot: ForgotPasswordDto) {
    return this.forgotPasswordService.resetPassword(forgotPasswordDforgot);
  }
}
