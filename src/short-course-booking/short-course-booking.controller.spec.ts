import { Test, TestingModule } from '@nestjs/testing';
import { ShortCourseBookingController } from './short-course-booking.controller';
import { ShortCourseBookingService } from './short-course-booking.service';

describe('ShortCourseBookingController', () => {
  let controller: ShortCourseBookingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShortCourseBookingController],
      providers: [ShortCourseBookingService],
    }).compile();

    controller = module.get<ShortCourseBookingController>(
      ShortCourseBookingController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
