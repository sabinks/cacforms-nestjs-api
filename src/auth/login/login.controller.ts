import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { LocalGuard } from '../guards/local.guard';

@Controller('api/auth')
export class LoginController {
  constructor() {}

  @Post('login')
  @UseGuards(LocalGuard)
  async login(@Request() req) {
    return req.user;
  }
  @Post('get-user')
  @UseGuards(AuthGuard('jwt'))
  async getUser(@Request() req) {
    const { name, email, isActive, id } = req.user;
    return {
      email,
      name,
      isActive,
      userId: id,
      role: 'superadmin',
    };
  }

  @Get('status')
  @UseGuards(JwtAuthGuard)
  status(@Request() req) {
    console.log('Inside auth status method');
    console.log(req.user);
  }
}
