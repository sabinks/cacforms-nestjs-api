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
} from '@nestjs/common';
import { UserBookingService } from './user-booking.service';
import { CreateUserBookingDto } from './dto/create-user-booking.dto';
import { UpdateUserBookingDto } from './dto/update-user-booking.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

@Controller('api/user-booking')
export class UserBookingController {
  constructor(private readonly userBookingService: UserBookingService) {}

  @Post()
  @UseInterceptors(FileInterceptor('signature'))
  create(
    @Body() createUserBookingDto: CreateUserBookingDto,
    @Res() response: Response,
  ) {
    const { validateOnlyTest } = createUserBookingDto;
    if (validateOnlyTest) {
      return response.status(200).send({ message: 'validationOk' });
    }
    this.userBookingService.create(createUserBookingDto);
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
