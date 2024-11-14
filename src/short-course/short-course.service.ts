import { HttpException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PaginateFunction, paginator } from 'src/pagination/paginator';
import { PrismaService } from 'src/prisma/prisma.service';
import { newDate } from 'src/utils/helpers';
import { CreateShortCourseDto } from './dto/create-short-course.dto';
import { UpdateShortCourseDto } from './dto/update-short-course.dto';

const paginate: PaginateFunction = paginator({ perPage: 10 });

@Injectable()
export class ShortCourseService {
  constructor(private prisma: PrismaService) {}
  async create(createShortCourseDto: CreateShortCourseDto) {
    const { name, courseCode, practicalDuration, currency, remark } =
      createShortCourseDto;

    await this.prisma.shortCourse.create({
      data: {
        name,
        courseCode,
        practicalDuration,
        currency,
        remark,
        createdAt: newDate(),
        updatedAt: newDate(),
      },
    });
    return 'This action adds a new shortCourse';
  }
  async findAll({
    where,
    orderBy,
    page = 1,
    perPage = 10,
  }: {
    where?: Prisma.ShortCourseWhereInput;
    orderBy?: Prisma.ShortCourseOrderByWithRelationInput;
    page?: number;
    perPage?: number;
  }) {
    return paginate(
      this.prisma.shortCourse,
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
    const shortCourse = await this.prisma.shortCourse.findFirst({
      where: { id },
    });

    if (!shortCourse) {
      throw new HttpException('Short course not found!', 404);
    }
    return shortCourse;
  }

  update(id: number, updateShortCourseDto: UpdateShortCourseDto) {
    return `This action updates a #${id} shortCourse`;
  }

  async remove(id: number) {
    const shortCourse = await this.prisma.shortCourse.findFirst({
      where: { id },
      include: {
        shortCourseBooking: {
          where: { shortCourseId: id },
        },
      },
    });
    if (!shortCourse) {
      throw new HttpException(
        'Short course used for booking, could not deleet!',
        404,
      );
    }
    if (shortCourse.shortCourseBooking.length > 0) {
      throw new HttpException(
        'Short course used for booking, could not deleet!',
        400,
      );
    }
    await this.prisma.shortCourse.delete({ where: { id } });
  }
}
