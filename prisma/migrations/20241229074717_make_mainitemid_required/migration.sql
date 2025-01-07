-- AlterTable
ALTER TABLE `Section` ADD COLUMN `mainItemId` INTEGER NULL;

-- CreateTable
CREATE TABLE `MainItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Section` ADD CONSTRAINT `Section_mainItemId_fkey` FOREIGN KEY (`mainItemId`) REFERENCES `MainItem`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
