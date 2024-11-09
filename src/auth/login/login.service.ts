import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class LoginService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async validateUser({ email, password }: LoginDto) {
    const findUser = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (!findUser) {
      return null;
    }

    const passwordMatch = await bcrypt.compare(
      password,
      (await findUser).password,
    );
    const userRoles = await this.prisma.userRole.findFirst({
      where: {
        userId: findUser.id,
      },
      select: {
        role: {
          select: {
            name: true,
          },
        },
      },
    });

    if (passwordMatch) {
      return { ...findUser, role: userRoles.role.name };
    }
  }
  async generateJwt(user) {
    return this.jwt.sign({
      userId: user.id,
      name: user.name,
      isActive: user.isActive,
    });
  }
}
