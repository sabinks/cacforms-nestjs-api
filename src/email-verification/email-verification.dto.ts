import { IsNotEmpty, IsString } from 'class-validator';

export class EmailVerificationDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  @IsString()
  token: string;
}
