/*
  Warnings:

  - You are about to drop the `short_course_booking` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Booking` DROP FOREIGN KEY `Booking_shortCourseBookingId_fkey`;

-- DropForeignKey
ALTER TABLE `short_course_booking` DROP FOREIGN KEY `short_course_booking_locationId_fkey`;

-- DropForeignKey
ALTER TABLE `short_course_booking` DROP FOREIGN KEY `short_course_booking_shortCourseId_fkey`;

-- DropTable
DROP TABLE `short_course_booking`;

-- CreateTable
CREATE TABLE `ShortCourseBooking` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `shortCourseId` INTEGER NOT NULL,
    `locationId` INTEGER NOT NULL,
    `bookingDatetime` VARCHAR(191) NOT NULL,
    `price` DECIMAL(6, 2) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT false,
    `createdBy` INTEGER NOT NULL,
    `updatedBy` INTEGER NOT NULL,
    `createdAt` VARCHAR(191) NOT NULL,
    `updatedAt` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ShortCourseBooking` ADD CONSTRAINT `ShortCourseBooking_locationId_fkey` FOREIGN KEY (`locationId`) REFERENCES `Locations`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ShortCourseBooking` ADD CONSTRAINT `ShortCourseBooking_shortCourseId_fkey` FOREIGN KEY (`shortCourseId`) REFERENCES `ShortCourse`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_shortCourseBookingId_fkey` FOREIGN KEY (`shortCourseBookingId`) REFERENCES `ShortCourseBooking`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
