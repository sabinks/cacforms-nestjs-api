import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ShortCourseListService {
  constructor(private prisma: PrismaService) {}

  async findAll(locationId: string, courseName, bookingDatetime) {
    let whereClause = {};
    if (locationId && courseName && bookingDatetime) {
      whereClause = {
        locationId: parseInt(locationId),
        shortCourse: { name: courseName },
        bookingDatetime,
      };
    } else if (locationId && bookingDatetime) {
      whereClause = {
        locationId: parseInt(locationId),
        bookingDatetime,
      };
    } else if (locationId && courseName) {
      whereClause = {
        locationId: parseInt(locationId),
        shortCourse: { name: courseName },
      };
    } else {
      whereClause = {
        locationId: parseInt(locationId),
      };
    }
    return await this.prisma.shortCourseBooking.findMany({
      where: {
        ...whereClause,
        isActive: true,
        shortCourse: { isActive: true },
      },
      select: {
        id: true,
        shortCourse: {
          select: {
            _count: true,
            id: true,
            name: true,
            courseCode: true,
            currency: true,
            practicalDuration: true,
            remark: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        location: {
          select: {
            _count: true,
            id: true,
            name: true,
            address: true,
            shortName: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        price: true,
        bookingDatetime: true,
        isActive: true,
      },
    });
  }
}
