import { Test, TestingModule } from '@nestjs/testing';
import { ShortCourseService } from './short-course.service';

describe('ShortCourseService', () => {
  let service: ShortCourseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShortCourseService],
    }).compile();

    service = module.get<ShortCourseService>(ShortCourseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
