import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { Response } from 'express';
import { CreateShortCourseDto } from './dto/create-short-course.dto';
import { UpdateShortCourseDto } from './dto/update-short-course.dto';
import { ShortCourseService } from './short-course.service';

@Controller('/api/short-course')
export class ShortCourseController {
  constructor(private readonly shortCourseService: ShortCourseService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UseGuards(ThrottlerGuard)
  @Throttle({ default: { ttl: 60000, limit: 100 } })
  @UsePipes(ValidationPipe)
  create(
    @Body() createShortCourseDto: CreateShortCourseDto,
    @Res() res: Response,
  ) {
    this.shortCourseService.create(createShortCourseDto);
    return res.status(HttpStatus.OK).json({
      message: 'Short Course Created!',
    });
  }

  @Get()
  findAll() {
    return this.shortCourseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shortCourseService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateShortCourseDto: UpdateShortCourseDto,
  ) {
    return this.shortCourseService.update(+id, updateShortCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shortCourseService.remove(+id);
  }
}
