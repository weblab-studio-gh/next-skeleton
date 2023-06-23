/*
  Warnings:

  - You are about to drop the column `logo` on the `brand` table. All the data in the column will be lost.
  - You are about to drop the `_producttoproductimage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `productimage` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[logoId]` on the table `Brand` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `logoId` to the `Brand` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_producttoproductimage` DROP FOREIGN KEY `_ProductToProductImage_A_fkey`;

-- DropForeignKey
ALTER TABLE `_producttoproductimage` DROP FOREIGN KEY `_ProductToProductImage_B_fkey`;

-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_imageId_fkey`;

-- AlterTable
ALTER TABLE `brand` DROP COLUMN `logo`,
    ADD COLUMN `logoId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `product` ADD COLUMN `storeMargin` INTEGER NULL,
    ADD COLUMN `webMargin` INTEGER NULL;

-- DropTable
DROP TABLE `_producttoproductimage`;

-- DropTable
DROP TABLE `productimage`;

-- CreateTable
CREATE TABLE `Image` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `path` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ImageToProduct` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_ImageToProduct_AB_unique`(`A`, `B`),
    INDEX `_ImageToProduct_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Brand_logoId_key` ON `Brand`(`logoId`);

-- AddForeignKey
ALTER TABLE `Brand` ADD CONSTRAINT `Brand_logoId_fkey` FOREIGN KEY (`logoId`) REFERENCES `Image`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_imageId_fkey` FOREIGN KEY (`imageId`) REFERENCES `Image`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ImageToProduct` ADD CONSTRAINT `_ImageToProduct_A_fkey` FOREIGN KEY (`A`) REFERENCES `Image`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ImageToProduct` ADD CONSTRAINT `_ImageToProduct_B_fkey` FOREIGN KEY (`B`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
