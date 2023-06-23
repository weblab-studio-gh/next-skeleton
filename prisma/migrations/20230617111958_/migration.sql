/*
  Warnings:

  - You are about to drop the column `vatId` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `order` DROP COLUMN `vatId`,
    ADD COLUMN `note` VARCHAR(191) NULL,
    ADD COLUMN `shippingId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `price`,
    ADD COLUMN `brandId` VARCHAR(191) NULL,
    ADD COLUMN `costPrice` INTEGER NULL,
    ADD COLUMN `storePrice` INTEGER NULL,
    ADD COLUMN `unit` ENUM('PIECE', 'KG', 'LITER') NULL DEFAULT 'PIECE',
    ADD COLUMN `vat` ENUM('VAT_0', 'VAT_10', 'VAT_27') NOT NULL DEFAULT 'VAT_0',
    ADD COLUMN `webPrice` INTEGER NULL;

-- CreateTable
CREATE TABLE `Brand` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `logo` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Shipping` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `fee` INTEGER NOT NULL,
    `data` JSON NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_brandId_fkey` FOREIGN KEY (`brandId`) REFERENCES `Brand`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_shippingId_fkey` FOREIGN KEY (`shippingId`) REFERENCES `Shipping`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
