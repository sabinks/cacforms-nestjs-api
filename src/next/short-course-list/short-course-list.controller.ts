import { Controller, Get, Query } from '@nestjs/common';
import { ShortCourseListService } from './short-course-list.service';

@Controller('api/next/short-course-list')
export class ShortCourseListController {
  constructor(
    private readonly shortCourseListService: ShortCourseListService,
  ) {}

  @Get()
  findAll(
    @Query('location_id') locationId: string,
    @Query('course_name') courseName: string,
    @Query('booking_datetime') bookingDatetime: string,
  ) {
    return this.shortCourseListService.findAll(
      locationId,
      courseName,
      bookingDatetime,
    );
  }
}
