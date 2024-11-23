import { PartialType } from '@nestjs/mapped-types';
import { CreateShortCourseBookingDto } from './create-short-course-booking.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateShortCourseBookingDto extends PartialType(
  CreateShortCourseBookingDto,
) {
  @IsNotEmpty()
  locationId: number;

  @IsNotEmpty()
  @IsString()
  bookingDatetime: string;

  @IsNotEmpty()
  price: number;

  isActive?: boolean;
}
