import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LocationService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const locations = await this.prisma.locations.findMany({
      select: {
        id: true,
        name: true,
        shortName: true,
      },
    });
    return locations.map((location) => ({
      ...location,
      label: location.name,
      value: location.id,
    }));
  }
}
