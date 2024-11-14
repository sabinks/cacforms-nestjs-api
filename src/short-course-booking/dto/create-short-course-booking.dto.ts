import { IsNotEmpty, IsString } from 'class-validator';

export class CreateShortCourseBookingDto {
  @IsNotEmpty()
  shortCourseId: number;

  @IsNotEmpty()
  locationId: number;

  @IsNotEmpty()
  @IsString()
  bookingDatetime: string;

  @IsNotEmpty()
  price: number;

  isActive: boolean;
}
