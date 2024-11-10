import { Module } from '@nestjs/common';
import { ShortCourseBookingService } from './short-course-booking.service';
import { ShortCourseBookingController } from './short-course-booking.controller';

@Module({
  controllers: [ShortCourseBookingController],
  providers: [ShortCourseBookingService],
})
export class ShortCourseBookingModule {}
