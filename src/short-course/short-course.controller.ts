import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { Response } from 'express';
import { CreateShortCourseDto } from './dto/create-short-course.dto';
import { UpdateShortCourseDto } from './dto/update-short-course.dto';
import { ShortCourseService } from './short-course.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('/api/short-course')
export class ShortCourseController {
  constructor(private readonly shortCourseService: ShortCourseService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UseGuards(ThrottlerGuard)
  @Throttle({ default: { ttl: 60000, limit: 100 } })
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileFieldsInterceptor([{ name: 'file', maxCount: 2 }]))
  create(
    @UploadedFiles() files: { file?: Express.Multer.File[] },
    @Body() createShortCourseDto: CreateShortCourseDto,
    @Res() response: Response,
  ) {
    this.shortCourseService.create(files, createShortCourseDto);
    return response.status(HttpStatus.OK).json({
      message: 'Short Course Created!',
    });
  }

  @Get()
  findAll(
    @Query('perPage') perPage: number,
    @Query('page') page: number,
    @Query('order') order: string,
    @Query('orderBy') orderBy: string,
    @Query('search') search: string,
  ) {
    return this.shortCourseService.findAll({
      where: {},
      orderBy: { [orderBy]: order },
      perPage,
      page,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shortCourseService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateShortCourseDto: UpdateShortCourseDto,
    @Res() response: Response,
  ) {
    this.shortCourseService.update(+id, updateShortCourseDto);
    return response.status(HttpStatus.OK).json({
      message: 'Short Course Updated!',
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() response: Response) {
    try {
      this.shortCourseService.remove(+id);
    } catch (error) {}
  }

  @Post(':id/change-status')
  changeStatus(
    @Param('id') id: string,
    @Body() body: any,
    @Res() response: Response,
  ) {
    this.shortCourseService.changeStatus(+id, body);
    return response.status(HttpStatus.OK).json({
      message: 'Short Course Updated!',
    });
  }
}
