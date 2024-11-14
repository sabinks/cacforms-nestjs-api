import { Inject, Injectable } from '@nestjs/common';
import { CreateRegisterDto } from './dto/create-register.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { uid } from 'uid';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class RegisterService {
  constructor(
    private prisma: PrismaService,
    @Inject('MAIL_SERVICE') private client: ClientProxy,
  ) {}

  async create({ name, email, password }: CreateRegisterDto) {
    const hashPassword = await bcrypt.hash(password, 12);
    const verificationToken = uid(20);
    const roleExists = await this.prisma.role.findFirst({
      where: {
        name: 'student',
      },
    });
    const newUser = await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
        isActive: false,
        emailVerifiedAt: '',
        verificationToken,
        userRole: {
          create: {
            roleId: roleExists.id,
          },
        },
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: hidePassword, ...user } = newUser;
    const payload = {
      name: newUser.name ? newUser.name : newUser.email,
      email: newUser.email,
      verificationTokenUrl:
        process.env.FRONTEND_URL +
        '/email-verification?id=' +
        newUser.id +
        '&token=' +
        verificationToken,
    };
    this.client.emit('email-verification', payload);
  }
}
