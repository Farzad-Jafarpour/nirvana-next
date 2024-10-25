-- CreateTable
CREATE TABLE `_MenuItemExtras` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_MenuItemExtras_AB_unique`(`A`, `B`),
    INDEX `_MenuItemExtras_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_MenuItemExtras` ADD CONSTRAINT `_MenuItemExtras_A_fkey` FOREIGN KEY (`A`) REFERENCES `ExtraItem`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_MenuItemExtras` ADD CONSTRAINT `_MenuItemExtras_B_fkey` FOREIGN KEY (`B`) REFERENCES `MenuItem`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
