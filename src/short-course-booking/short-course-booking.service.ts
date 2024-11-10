import { Injectable } from '@nestjs/common';
import { CreateShortCourseBookingDto } from './dto/create-short-course-booking.dto';
import { UpdateShortCourseBookingDto } from './dto/update-short-course-booking.dto';

@Injectable()
export class ShortCourseBookingService {
  create(createShortCourseBookingDto: CreateShortCourseBookingDto) {
    return 'This action adds a new shortCourseBooking';
  }

  findAll() {
    return `This action returns all shortCourseBooking`;
  }

  findOne(id: number) {
    return `This action returns a #${id} shortCourseBooking`;
  }

  update(id: number, updateShortCourseBookingDto: UpdateShortCourseBookingDto) {
    return `This action updates a #${id} shortCourseBooking`;
  }

  remove(id: number) {
    return `This action removes a #${id} shortCourseBooking`;
  }
}
