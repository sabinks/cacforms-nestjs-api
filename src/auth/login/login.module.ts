import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { LocalStrategy } from '../strategies/local.strategy';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';

@Module({
  imports: [
    PassportModule,
    // JwtModule.register({
    //     // secret: `thissecretshouldbelongcomplexstring`,
    //     secret: process.env.AUTH_SECRET,
    //     signOptions: { expiresIn: "240h" }
    // }),
    PrismaModule,
  ],
  controllers: [LoginController],
  providers: [LoginService, LocalStrategy, JwtStrategy],
})
export class LoginModule {}
