/*
  Warnings:

  - You are about to alter the column `price` on the `short_course_booking` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(6,2)`.

*/
-- AlterTable
ALTER TABLE `short_course_booking` MODIFY `price` DECIMAL(6, 2) NOT NULL;
