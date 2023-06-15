/*
  Warnings:

  - You are about to drop the `_attributetoproductattribute` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_attributetovariation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_productattributetoproductvariation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_producttoproductvariation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_productvariationtovariation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `attribute` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `productattribute` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[productId,variationId]` on the table `ProductVariation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `ProductVariation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `ProductVariation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `variationId` to the `ProductVariation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_attributetoproductattribute` DROP FOREIGN KEY `_AttributeToProductAttribute_A_fkey`;

-- DropForeignKey
ALTER TABLE `_attributetoproductattribute` DROP FOREIGN KEY `_AttributeToProductAttribute_B_fkey`;

-- DropForeignKey
ALTER TABLE `_attributetovariation` DROP FOREIGN KEY `_AttributeToVariation_A_fkey`;

-- DropForeignKey
ALTER TABLE `_attributetovariation` DROP FOREIGN KEY `_AttributeToVariation_B_fkey`;

-- DropForeignKey
ALTER TABLE `_productattributetoproductvariation` DROP FOREIGN KEY `_ProductAttributeToProductVariation_A_fkey`;

-- DropForeignKey
ALTER TABLE `_productattributetoproductvariation` DROP FOREIGN KEY `_ProductAttributeToProductVariation_B_fkey`;

-- DropForeignKey
ALTER TABLE `_producttoproductvariation` DROP FOREIGN KEY `_ProductToProductVariation_A_fkey`;

-- DropForeignKey
ALTER TABLE `_producttoproductvariation` DROP FOREIGN KEY `_ProductToProductVariation_B_fkey`;

-- DropForeignKey
ALTER TABLE `_productvariationtovariation` DROP FOREIGN KEY `_ProductVariationToVariation_A_fkey`;

-- DropForeignKey
ALTER TABLE `_productvariationtovariation` DROP FOREIGN KEY `_ProductVariationToVariation_B_fkey`;

-- AlterTable
ALTER TABLE `productvariation` ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `productId` VARCHAR(191) NOT NULL,
    ADD COLUMN `variationId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `_attributetoproductattribute`;

-- DropTable
DROP TABLE `_attributetovariation`;

-- DropTable
DROP TABLE `_productattributetoproductvariation`;

-- DropTable
DROP TABLE `_producttoproductvariation`;

-- DropTable
DROP TABLE `_productvariationtovariation`;

-- DropTable
DROP TABLE `attribute`;

-- DropTable
DROP TABLE `productattribute`;

-- CreateTable
CREATE TABLE `ProductVariationOptions` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `variationId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VariationOptions` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `variationId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `ProductVariation_productId_variationId_key` ON `ProductVariation`(`productId`, `variationId`);

-- AddForeignKey
ALTER TABLE `ProductVariation` ADD CONSTRAINT `ProductVariation_variationId_fkey` FOREIGN KEY (`variationId`) REFERENCES `Variation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductVariation` ADD CONSTRAINT `ProductVariation_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductVariationOptions` ADD CONSTRAINT `ProductVariationOptions_variationId_fkey` FOREIGN KEY (`variationId`) REFERENCES `ProductVariation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VariationOptions` ADD CONSTRAINT `VariationOptions_variationId_fkey` FOREIGN KEY (`variationId`) REFERENCES `Variation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
