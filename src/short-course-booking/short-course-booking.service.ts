import { HttpException, Injectable } from '@nestjs/common';
import { CreateShortCourseBookingDto } from './dto/create-short-course-booking.dto';
import { UpdateShortCourseBookingDto } from './dto/update-short-course-booking.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { newDate } from 'src/utils/helpers';
import { Prisma } from '@prisma/client';
import { PaginateFunction, paginator } from 'src/pagination/paginator';
const paginate: PaginateFunction = paginator({ perPage: 10 });

@Injectable()
export class ShortCourseBookingService {
  constructor(private prisma: PrismaService) {}

  async create(
    createShortCourseBookingDto: CreateShortCourseBookingDto,
    userId: number,
  ) {
    const { shortCourseId, locationId, bookingDatetime, isActive, price } =
      createShortCourseBookingDto;

    const shortCourseBookkingExists =
      await this.prisma.shortCourseBooking.findFirst({
        where: { shortCourseId, locationId, bookingDatetime },
      });

    if (shortCourseBookkingExists) {
      throw new HttpException(
        'Short course booking already exists, cannot create duplicate!',
        400,
      );
    }
    await this.prisma.shortCourseBooking.create({
      data: {
        shortCourseId,
        locationId,
        bookingDatetime,
        isActive,
        price,
        createdBy: userId,
        updatedBy: userId,
        createdAt: newDate(),
        updatedAt: newDate(),
      },
    });
  }

  async findAll({
    where,
    orderBy,
    page = 1,
    perPage = 10,
  }: {
    where?: Prisma.ShortCourseBookingWhereInput;
    orderBy?: Prisma.ShortCourseBookingOrderByWithRelationInput;
    page?: number;
    perPage?: number;
  }) {
    return paginate(
      this.prisma.shortCourseBooking,
      {
        where,
        orderBy,
      },
      {
        page,
        perPage: perPage,
      },
    );
  }

  async findOne(id: number) {
    const booking = await this.prisma.shortCourseBooking.findFirst({
      where: { id },
      include: {
        shortCourse: {
          select: {
            name: true,
            id: true,
            courseCode: true,
            currency: true,
            imageName: true,
            imagePath: true,
            remark: true,
          },
        },
      },
    });

    if (!booking) {
      throw new HttpException('Short course booking not found!', 404);
    }
    return booking;
  }

  async update(
    id: number,
    updateShortCourseBookingDto: UpdateShortCourseBookingDto,
  ) {
    const { locationId, bookingDatetime, price, isActive } =
      updateShortCourseBookingDto;
    await this.prisma.shortCourseBooking.update({
      where: { id },
      data: { locationId, bookingDatetime, price, isActive },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} shortCourseBooking`;
  }

  async changeStatus(id: number, body: any) {
    await this.prisma.shortCourseBooking.update({
      where: {
        id,
      },
      data: {
        isActive: body.isActive,
      },
    });
  }
}
