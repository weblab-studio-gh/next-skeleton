/*
  Warnings:

  - You are about to drop the column `price` on the `productvariationoptions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `product` ADD COLUMN `height` VARCHAR(191) NULL,
    ADD COLUMN `length` VARCHAR(191) NULL,
    ADD COLUMN `weight` VARCHAR(191) NULL,
    ADD COLUMN `width` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `productvariationoptions` DROP COLUMN `price`,
    ADD COLUMN `barcode` VARCHAR(191) NULL,
    ADD COLUMN `costPrice` INTEGER NULL,
    ADD COLUMN `height` VARCHAR(191) NULL,
    ADD COLUMN `length` VARCHAR(191) NULL,
    ADD COLUMN `quantity` VARCHAR(191) NULL,
    ADD COLUMN `sku` VARCHAR(191) NULL,
    ADD COLUMN `storePrice` INTEGER NULL,
    ADD COLUMN `webPrice` INTEGER NULL,
    ADD COLUMN `weight` VARCHAR(191) NULL,
    ADD COLUMN `width` VARCHAR(191) NULL;
