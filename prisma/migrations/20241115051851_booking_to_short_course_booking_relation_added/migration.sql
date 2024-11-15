-- AlterTable
ALTER TABLE `Booking` ADD COLUMN `shortCourseBookingId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_shortCourseBookingId_fkey` FOREIGN KEY (`shortCourseBookingId`) REFERENCES `short_course_booking`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
