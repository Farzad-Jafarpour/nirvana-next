/*
  Warnings:

  - You are about to drop the column `isAnable` on the `MenuItem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `MenuItem` DROP COLUMN `isAnable`,
    ADD COLUMN `isEnable` BOOLEAN NOT NULL DEFAULT true;
