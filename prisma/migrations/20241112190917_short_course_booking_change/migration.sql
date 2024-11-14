/*
  Warnings:

  - You are about to drop the `ShortCourseBooking` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `ShortCourseBooking`;

-- CreateTable
CREATE TABLE `short_course_booking` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `shortCourseId` INTEGER NOT NULL,
    `locationId` INTEGER NOT NULL,
    `bookingDatetime` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT false,
    `createdBy` INTEGER NOT NULL,
    `updatedBy` INTEGER NOT NULL,
    `createdAt` VARCHAR(191) NOT NULL,
    `updatedAt` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
