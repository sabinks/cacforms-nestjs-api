import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MailService } from 'src/mail/mail.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { uid } from 'uid';
import { ForgotPasswordDto } from './forgot-password.dto';

@Injectable()
export class ForgotPasswordService {
  constructor(
    private prisma: PrismaService,
    private mailService: MailService,
    @Inject('MAIL_SERVICE') private client: ClientProxy,
  ) {}
  async resetPassword(forgotPassword: ForgotPasswordDto) {
    const userExist = await this.prisma.user.findFirst({
      where: { email: forgotPassword.email },
    });

    if (!userExist) {
      throw new NotFoundException();
    }
    const token = uid(20);

    await this.prisma.resetPassword.upsert({
      where: { userId: userExist.id },
      update: {
        token,
      },
      create: {
        userId: userExist.id,
        token,
      },
    });
    const payload = {
      username: userExist.name ? userExist.name : userExist.email,
      email: userExist.email,
      resetUrl: process.env.FRONTEND_URL + '/reset-password?token=' + token,
    };
    this.client.emit('forgot-password', payload);
    // this.mailService.resetPasswordMail(payload);
  }
}
