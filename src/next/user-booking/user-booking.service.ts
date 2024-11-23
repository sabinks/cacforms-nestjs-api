import { Inject, Injectable } from '@nestjs/common';
import { CreateUserBookingDto } from './dto/create-user-booking.dto';
import { UpdateUserBookingDto } from './dto/update-user-booking.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { newDate } from 'src/utils/helpers';
import { ClientProxy } from '@nestjs/microservices';
import * as moment from 'moment';
import { unlinkSync } from 'fs';

@Injectable()
export class UserBookingService {
  constructor(
    private prisma: PrismaService,
    @Inject('MAIL_SERVICE') private client: ClientProxy,
  ) {}
  async create(files: any = [], createUserBookingDto: CreateUserBookingDto) {
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
    const newFiles = [];

    const booking = await this.prisma.booking.create({
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
        shortCourseBookId: parseInt(shortCourseBookId),
        shortCourseBookingId: parseInt(shortCourseBookId),
        pi: '123',
        pm: '123',
        data: { ...createUserBookingDto },
        createdAt: newDate(),
        updatedAt: newDate(),
      },
    });
    files.file.forEach((file) => {
      const fileResponse = {
        originalName: file.originalname,
        imageName: file.filename,
        imagePath: file.path,
        bookingId: booking.id,
      };
      newFiles.push(fileResponse);
    });
    await this.prisma.bookingDocument.createMany({
      data: newFiles,
    });
    const shortcourseBooking = await this.prisma.shortCourseBooking.findFirst({
      where: { id: parseInt(shortCourseBookId) },
      include: {
        shortCourse: true,
      },
    });
    const name = `${firstName} ${middleName} ${lastName}`;

    const payload = {
      email,
      name,
      shortcourseBooking: {
        ...shortcourseBooking,
        shortCourse: {
          ...shortcourseBooking.shortCourse,
          bookingDateTime: moment(
            shortcourseBooking.bookingDatetime,
            'YYYY-MM-DD HH:mm:ss',
          ).format('YYYY-MM-DD h:mm:ss A'),
        },
      },
    };

    this.client.emit('shortcourse-booking-booked', payload);
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
