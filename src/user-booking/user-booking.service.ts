import { Injectable } from '@nestjs/common';
import { CreateUserBookingDto } from './dto/create-user-booking.dto';
import { UpdateUserBookingDto } from './dto/update-user-booking.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { newDate } from 'src/utils/helpers';

@Injectable()
export class UserBookingService {
  constructor(private prisma: PrismaService) {}
  async create(createUserBookingDto: CreateUserBookingDto) {
    const {
      firstName,
      middleName,
      lastName,
      email,
      dob,
      gender,
      usi,
      mobile,
      phone,
      shortCourseBookId,
    } = createUserBookingDto;
    await this.prisma.booking.create({
      data: {
        firstName,
        middleName,
        lastName,
        email,
        dob,
        gender,
        usi,
        mobile,
        phone,
        shortCourseBookId,
        shortCourseBookingId: shortCourseBookId,
        pi: '123',
        pm: '123',
        data: { ...createUserBookingDto },
        createdAt: newDate(),
        updatedAt: newDate(),
      },
    });
  }

  findAll() {
    return `This action returns all userBooking`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userBooking`;
  }

  update(id: number, updateUserBookingDto: UpdateUserBookingDto) {
    return `This action updates a #${id} userBooking`;
  }

  remove(id: number) {
    return `This action removes a #${id} userBooking`;
  }
}
