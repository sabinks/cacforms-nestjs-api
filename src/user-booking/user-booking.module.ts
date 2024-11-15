import { Module } from '@nestjs/common';
import { UserBookingService } from './user-booking.service';
import { UserBookingController } from './user-booking.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UserBookingController],
  providers: [UserBookingService],
})
export class UserBookingModule {}
