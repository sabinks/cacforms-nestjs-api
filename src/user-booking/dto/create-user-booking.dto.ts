import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserBookingDto {
  @IsNotEmpty()
  filledDate1: string;

  filledDate2: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  middleName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  dob: string;

  @IsNotEmpty()
  gender: string;

  @IsNotEmpty()
  street: string;

  @IsNotEmpty()
  postCode: string;

  @IsNotEmpty()
  suburb: string;

  @IsNotEmpty()
  state: string;

  phone: string;

  @IsNotEmpty()
  mobile: string;

  @IsNotEmpty()
  usi: string;

  @IsNotEmpty()
  guardianName: string;

  @IsNotEmpty()
  medicalHistory: string;

  @IsNotEmpty()
  documentType: string;

  //file documents all check

  //signature check
  //signature check

  @IsNotEmpty()
  shortCourseBookId: number;

  validateOnlyTest: boolean;

  @IsNotEmpty()
  pi: string;

  @IsNotEmpty()
  pm: string;
}
