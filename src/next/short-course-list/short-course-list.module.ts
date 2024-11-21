import { Module } from '@nestjs/common';
import { ShortCourseListService } from './short-course-list.service';
import { ShortCourseListController } from './short-course-list.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ShortCourseListController],
  providers: [ShortCourseListService],
})
export class ShortCourseListModule {}
