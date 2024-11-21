-- AddForeignKey
ALTER TABLE `short_course_booking` ADD CONSTRAINT `short_course_booking_locationId_fkey` FOREIGN KEY (`locationId`) REFERENCES `Locations`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
