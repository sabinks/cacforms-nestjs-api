/*
  Warnings:

  - Added the required column `originalName` to the `BookingDocument` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `BookingDocument` ADD COLUMN `originalName` VARCHAR(191) NOT NULL;
