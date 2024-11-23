import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateShortCourseBookingDto } from './dto/create-short-course-booking.dto';
import { UpdateShortCourseBookingDto } from './dto/update-short-course-booking.dto';
import { ShortCourseBookingService } from './short-course-booking.service';
import { AuthGuard } from '@nestjs/passport';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { response, Response } from 'express';

@Controller('api/short-course-booking')
export class ShortCourseBookingController {
  constructor(
    private readonly shortCourseBookingService: ShortCourseBookingService,
  ) {}

  @Post()
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard('jwt'))
  @UseGuards(ThrottlerGuard)
  @Throttle({ default: { ttl: 60000, limit: 100 } })
  create(
    @Body() createShortCourseBookingDto: CreateShortCourseBookingDto,
    @Req() req: any,
    @Res() res: Response,
  ) {
    const {
      user: { userId },
    } = req;
    this.shortCourseBookingService.create(createShortCourseBookingDto, userId);
    return res.status(201).send('Booking Added!');
  }

  @Get()
  findAll(
    @Query('perPage') perPage: number,
    @Query('page') page: number,
    @Query('order') order: string,
    @Query('orderBy') orderBy: string,
    @Query('search') search: string,
  ) {
    return this.shortCourseBookingService.findAll({
      where: {},
      orderBy: { [orderBy]: order },
      perPage,
      page,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shortCourseBookingService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateShortCourseBookingDto: UpdateShortCourseBookingDto,
    @Res() response: Response,
  ) {
    this.shortCourseBookingService.update(+id, updateShortCourseBookingDto);
    return response.status(HttpStatus.OK).json({
      message: 'Short Course Updated!',
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shortCourseBookingService.remove(+id);
  }

  @Post(':id/change-status')
  changeStatus(
    @Param('id') id: string,
    @Body() body: any,
    @Res() response: Response,
  ) {
    this.shortCourseBookingService.changeStatus(+id, body);
    return response.status(HttpStatus.OK).json({
      message: 'Short Course Updated!',
    });
  }
}
