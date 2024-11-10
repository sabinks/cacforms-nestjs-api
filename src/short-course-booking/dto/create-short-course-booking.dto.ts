import { IsNotEmpty, IsString } from 'class-validator';

export class CreateShortCourseBookingDto {
  @IsNotEmpty()
  @IsString()
  shortCourseId: number;

  @IsNotEmpty()
  @IsString()
  locationId: number;

  @IsNotEmpty()
  @IsString()
  bookingDatetime: string;

  @IsNotEmpty()
  @IsString()
  price: number;

  isActive: boolean;
}
