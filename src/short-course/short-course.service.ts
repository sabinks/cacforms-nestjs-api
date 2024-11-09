import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { newDate } from 'src/utils/helpers';
import { CreateShortCourseDto } from './dto/create-short-course.dto';
import { UpdateShortCourseDto } from './dto/update-short-course.dto';

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

  findAll() {
    return `This action returns all shortCourse`;
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
