-- AddForeignKey
ALTER TABLE `short_course_booking` ADD CONSTRAINT `short_course_booking_shortCourseId_fkey` FOREIGN KEY (`shortCourseId`) REFERENCES `ShortCourse`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
