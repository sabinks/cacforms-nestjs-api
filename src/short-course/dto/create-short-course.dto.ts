import { IsNotEmpty, IsString } from 'class-validator';

export class CreateShortCourseDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  courseCode: string;

  @IsNotEmpty()
  @IsString()
  currency: string;

  @IsNotEmpty()
  @IsString()
  practicalDuration: string;

  @IsNotEmpty()
  @IsString()
  remark: string;
}
