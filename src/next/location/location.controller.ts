import { Controller, Get } from '@nestjs/common';
import { LocationService } from './location.service';

@Controller('api/next/location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get()
  findAll() {
    return this.locationService.findAll();
  }
}
