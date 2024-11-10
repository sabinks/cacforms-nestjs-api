import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateShortCourseBookingDto } from './dto/create-short-course-booking.dto';
import { UpdateShortCourseBookingDto } from './dto/update-short-course-booking.dto';
import { ShortCourseBookingService } from './short-course-booking.service';

@Controller('short-course-booking')
export class ShortCourseBookingController {
  constructor(
    private readonly shortCourseBookingService: ShortCourseBookingService,
  ) {}

  @Post()
  create(@Body() createShortCourseBookingDto: CreateShortCourseBookingDto) {
    return this.shortCourseBookingService.create(createShortCourseBookingDto);
  }

  @Get()
  findAll() {
    return this.shortCourseBookingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shortCourseBookingService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateShortCourseBookingDto: UpdateShortCourseBookingDto,
  ) {
    return this.shortCourseBookingService.update(
      +id,
      updateShortCourseBookingDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shortCourseBookingService.remove(+id);
  }
}
