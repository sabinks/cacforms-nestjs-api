import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
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
  async create(files, createShortCourseDto: CreateShortCourseDto) {
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

  async update(id: number, updateShortCourseDto: UpdateShortCourseDto) {
    const { name, courseCode, currency, practicalDuration, remark } =
      updateShortCourseDto;
    await this.prisma.shortCourse.update({
      where: { id },
      data: {
        name,
        courseCode,
        currency,
        practicalDuration,
        remark,
      },
    });
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
    try {
      if (!shortCourse) {
        throw new HttpException('Short course not found!', 404);
      }
      if (shortCourse.shortCourseBooking.length > 0) {
        throw new HttpException(
          'Short course used for booking, could not delete!',
          400,
        );
      }
      await this.prisma.shortCourse.delete({ where: { id } });
    } catch (error) {
      throw error.status == undefined
        ? new InternalServerErrorException()
        : new HttpException(error, error.status);
    }
  }

  async changeStatus(id: number, body: any) {
    await this.prisma.shortCourse.update({
      where: {
        id,
      },
      data: {
        isActive: body.isActive,
      },
    });
  }
}
