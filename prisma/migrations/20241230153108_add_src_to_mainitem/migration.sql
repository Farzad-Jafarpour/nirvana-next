/*
  Warnings:

  - Added the required column `src` to the `MainItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `MainItem` ADD COLUMN `src` VARCHAR(191) NOT NULL;
