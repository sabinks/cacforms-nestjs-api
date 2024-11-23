import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  Res,
  UploadedFile,
  UsePipes,
  ValidationPipe,
  UploadedFiles,
} from '@nestjs/common';
import { UserBookingService } from './user-booking.service';
import { CreateUserBookingDto } from './dto/create-user-booking.dto';
import { UpdateUserBookingDto } from './dto/update-user-booking.dto';
// import { FileInterceptor, NoFilesInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';

@Controller('/api/next/user-booking')
export class UserBookingController {
  constructor(private readonly userBookingService: UserBookingService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileFieldsInterceptor([{ name: 'file', maxCount: 2 }]))
  create(
    @UploadedFiles() files: { file?: Express.Multer.File[] },
    @Body() createUserBookingDto: CreateUserBookingDto,
    @Res() response: Response,
  ) {
    const { validateOnlyTest } = createUserBookingDto;

    if (validateOnlyTest.toLowerCase() == 'true') {
      return response.status(200).send({ message: 'validationOk' });
    }
    this.userBookingService.create(files, createUserBookingDto);
    return response
      .status(201)
      .send({ message: 'Short course booking completed!' });
  }

  @Get()
  findAll() {
    return this.userBookingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userBookingService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserBookingDto: UpdateUserBookingDto,
  ) {
    return this.userBookingService.update(+id, updateUserBookingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userBookingService.remove(+id);
  }
}
