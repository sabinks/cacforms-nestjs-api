import { Body, Controller, Post, Res } from '@nestjs/common';
import { ResetPasswordDto } from './reset-password.dto';
import { ResetPasswordService } from './reset-password.service';
import { Response } from 'express';

@Controller('api')
export class ResetPasswordController {
  constructor(private readonly resetPasswordService: ResetPasswordService) {}

  @Post('reset-password')
  resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
    @Res() response: Response,
  ) {
    this.resetPasswordService.resetPassword(resetPasswordDto);
    return response.status(200).send({ message: 'Password reset completed!' });
  }
}
