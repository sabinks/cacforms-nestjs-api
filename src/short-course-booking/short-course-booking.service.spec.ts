import { Test, TestingModule } from '@nestjs/testing';
import { ShortCourseBookingService } from './short-course-booking.service';

describe('ShortCourseBookingService', () => {
  let service: ShortCourseBookingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShortCourseBookingService],
    }).compile();

    service = module.get<ShortCourseBookingService>(ShortCourseBookingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
