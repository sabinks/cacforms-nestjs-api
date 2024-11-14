import { Module } from '@nestjs/common';
import { ShortCourseBookingService } from './short-course-booking.service';
import { ShortCourseBookingController } from './short-course-booking.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ShortCourseBookingController],
  providers: [ShortCourseBookingService],
})
export class ShortCourseBookingModule {}
