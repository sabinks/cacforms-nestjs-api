import { Injectable } from '@nestjs/common';
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

  findOne(id: number) {
    return `This action returns a #${id} shortCourse`;
  }

  update(id: number, updateShortCourseDto: UpdateShortCourseDto) {
    return `This action updates a #${id} shortCourse`;
  }

  remove(id: number) {
    return `This action removes a #${id} shortCourse`;
  }
}
