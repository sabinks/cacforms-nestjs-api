import { Module } from '@nestjs/common';
import { UserBookingService } from './user-booking.service';
import { UserBookingController } from './user-booking.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { uid } from 'uid';
// import { getExtension } from 'src/utils/helpers';
@Module({
  imports: [
    PrismaModule,
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads/booking',
        filename: (req, file, cb) => {
          const newName = uid(25);
          const extension = file.originalname
            ? file.originalname.split('.')[1]
            : '';
          const random = uid(5);
          const filename = `${newName}_${random}.${extension}`;
          cb(null, filename);
        },
      }),
    }),
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
