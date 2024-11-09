import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ShortCourseController } from './short-course.controller';
import { ShortCourseService } from './short-course.service';

@Module({
  imports: [PrismaModule],
  controllers: [ShortCourseController],
  providers: [ShortCourseService],
})
export class ShortCourseModule {}
