import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { LoginModule } from './auth/login/login.module';
import { ForgotPasswordModule } from './forgot-password/forgot-password.module';
import { MailModule } from './mail/mail.module';
import { MailService } from './mail/mail.service';
import { PrismaModule } from './prisma/prisma.module';
import { ResetPasswordModule } from './reset-password/reset-password.module';
import { ShortCourseBookingModule } from './short-course-booking/short-course-booking.module';
import { ShortCourseModule } from './short-course/short-course.module';
import { UsersModule } from './users/users.module';
import { StripeModule } from './stripe/stripe.module';
import { RegisterModule } from './auth/register/register.module';
import { EmailVerificationModule } from './email-verification/email-verification.module';
import { BookingModule } from './booking/booking.module';
import { UserBookingModule } from './user-booking/user-booking.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    RegisterModule,
    UsersModule,
    PrismaModule,
    LoginModule,
    ResetPasswordModule,
    ForgotPasswordModule,
    MailModule,
    JwtModule.register({
      global: true,
      secret: process.env.AUTH_SECRET,
      signOptions: { expiresIn: '240h' },
    }),
    StripeModule,
    StripeModule.forRoot(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-10-28.acacia',
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100,
      },
    ]),
    ShortCourseModule,
    ClientsModule.register([
      {
        name: 'MAIL_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [
            process.env.NODE_ENV == 'development'
              ? 'amqp://localhost:5672'
              : `${process.env.RBMQ_URL}`,
          ],
          queue: 'mail_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        port: Number(process.env.MAIL_PORT),
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      },
      defaults: {
        from: '"No Reply" <noreply@example.com>',
      },
      template: {
        dir: join(__dirname, 'mail/templates'),
        adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
        options: {
          strict: true,
        },
      },
    }),
    ShortCourseBookingModule,
    EmailVerificationModule,
    BookingModule,
    UserBookingModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    MailService,
    JwtService,
  ],
  exports: [MailService, JwtService],
})
export class AppModule {}
