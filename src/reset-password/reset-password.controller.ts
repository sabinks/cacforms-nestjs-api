import { Body, Controller, Post } from '@nestjs/common';
import { ResetPasswordDto } from './reset-password.dto';
import { ResetPasswordService } from './reset-password.service';

@Controller('api')
export class ResetPasswordController {
  constructor(private readonly resetPasswordService: ResetPasswordService) {}

  @Post('reset-password')
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.resetPasswordService.resetPassword(resetPasswordDto);
  }
}
