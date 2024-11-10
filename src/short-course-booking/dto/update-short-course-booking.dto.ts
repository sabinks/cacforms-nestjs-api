import { PartialType } from '@nestjs/mapped-types';
import { CreateShortCourseBookingDto } from './create-short-course-booking.dto';

export class UpdateShortCourseBookingDto extends PartialType(CreateShortCourseBookingDto) {}
