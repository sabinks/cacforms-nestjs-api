import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ShortCourseController } from './short-course.controller';
import { ShortCourseService } from './short-course.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { uid } from 'uid';

@Module({
  imports: [
    PrismaModule,
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads/short-course',
        filename: (req, file, cb) => {
          const newName = uid(20);
          const extension = file.originalname
            ? file.originalname.split('.')[1]
            : '';
          const filename = `${newName}.${extension}`;
          cb(null, filename);
        },
      }),
    }),
  ],
  controllers: [ShortCourseController],
  providers: [ShortCourseService],
})
export class ShortCourseModule {}
