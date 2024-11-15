import { Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { PaginateFunction, paginator } from 'src/pagination/paginator';
const paginate: PaginateFunction = paginator({ perPage: 10 });

@Injectable()
export class BookingService {
  constructor(private prisma: PrismaService) {}
  create(createBookingDto: CreateBookingDto) {}

  async findAll({
    where,
    orderBy,
    page = 1,
    perPage = 10,
  }: {
    where?: Prisma.BookingWhereInput;
    orderBy?: Prisma.BookingOrderByWithRelationInput;
    page?: number;
    perPage?: number;
  }) {
    return paginate(
      this.prisma.booking,
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

  findOne(id: number) {
    return `This action returns a #${id} booking`;
  }

  update(id: number, updateBookingDto: UpdateBookingDto) {
    return `This action updates a #${id} booking`;
  }

  remove(id: number) {
    return `This action removes a #${id} booking`;
  }
}
