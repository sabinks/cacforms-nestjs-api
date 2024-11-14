import { Injectable } from '@nestjs/common';
import { EmailVerificationDto } from './email-verification.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { newDate } from 'src/utils/helpers';

@Injectable()
export class EmailVerificationService {
  constructor(private prisma: PrismaService) {}

  async emailVerification(emailVerificationDto: EmailVerificationDto) {
    const { id, token } = emailVerificationDto;
    const userExist = await this.prisma.user.findFirst({
      where: { id, verificationToken: token },
    });
    if (userExist) {
      await this.prisma.user.update({
        where: { id, verificationToken: token },
        data: {
          verificationToken: '',
          emailVerifiedAt: newDate(),
          isActive: true,
        },
      });
    }
  }
}
