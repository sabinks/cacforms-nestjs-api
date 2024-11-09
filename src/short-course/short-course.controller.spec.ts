import { Test, TestingModule } from '@nestjs/testing';
import { ShortCourseController } from './short-course.controller';
import { ShortCourseService } from './short-course.service';

describe('ShortCourseController', () => {
  let controller: ShortCourseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShortCourseController],
      providers: [ShortCourseService],
    }).compile();

    controller = module.get<ShortCourseController>(ShortCourseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
