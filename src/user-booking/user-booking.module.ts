import { Module } from '@nestjs/common';
import { UserBookingService } from './user-booking.service';
import { UserBookingController } from './user-booking.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    PrismaModule,
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
  ],
  controllers: [UserBookingController],
  providers: [UserBookingService],
})
export class UserBookingModule {}
