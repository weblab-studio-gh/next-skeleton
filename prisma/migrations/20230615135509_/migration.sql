/*
  Warnings:

  - You are about to drop the column `variationId` on the `attribute` table. All the data in the column will be lost.
  - You are about to drop the column `attributeId` on the `productattribute` table. All the data in the column will be lost.
  - You are about to drop the column `productVariationId` on the `productattribute` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `productvariation` table. All the data in the column will be lost.
  - You are about to drop the column `variationId` on the `productvariation` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `attribute` DROP FOREIGN KEY `Attribute_variationId_fkey`;

-- DropForeignKey
ALTER TABLE `productattribute` DROP FOREIGN KEY `ProductAttribute_attributeId_fkey`;

-- DropForeignKey
ALTER TABLE `productattribute` DROP FOREIGN KEY `ProductAttribute_productVariationId_fkey`;

-- DropForeignKey
ALTER TABLE `productvariation` DROP FOREIGN KEY `ProductVariation_productId_fkey`;

-- DropForeignKey
ALTER TABLE `productvariation` DROP FOREIGN KEY `ProductVariation_variationId_fkey`;

-- DropIndex
DROP INDEX `ProductVariation_productId_variationId_idx` ON `productvariation`;

-- AlterTable
ALTER TABLE `attribute` DROP COLUMN `variationId`;

-- AlterTable
ALTER TABLE `productattribute` DROP COLUMN `attributeId`,
    DROP COLUMN `productVariationId`;

-- AlterTable
ALTER TABLE `productvariation` DROP COLUMN `productId`,
    DROP COLUMN `variationId`;

-- CreateTable
CREATE TABLE `_ProductToProductVariation` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_ProductToProductVariation_AB_unique`(`A`, `B`),
    INDEX `_ProductToProductVariation_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_AttributeToVariation` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_AttributeToVariation_AB_unique`(`A`, `B`),
    INDEX `_AttributeToVariation_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_AttributeToProductAttribute` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_AttributeToProductAttribute_AB_unique`(`A`, `B`),
    INDEX `_AttributeToProductAttribute_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ProductVariationToVariation` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_ProductVariationToVariation_AB_unique`(`A`, `B`),
    INDEX `_ProductVariationToVariation_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ProductAttributeToProductVariation` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_ProductAttributeToProductVariation_AB_unique`(`A`, `B`),
    INDEX `_ProductAttributeToProductVariation_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ProductToProductVariation` ADD CONSTRAINT `_ProductToProductVariation_A_fkey` FOREIGN KEY (`A`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProductToProductVariation` ADD CONSTRAINT `_ProductToProductVariation_B_fkey` FOREIGN KEY (`B`) REFERENCES `ProductVariation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AttributeToVariation` ADD CONSTRAINT `_AttributeToVariation_A_fkey` FOREIGN KEY (`A`) REFERENCES `Attribute`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AttributeToVariation` ADD CONSTRAINT `_AttributeToVariation_B_fkey` FOREIGN KEY (`B`) REFERENCES `Variation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AttributeToProductAttribute` ADD CONSTRAINT `_AttributeToProductAttribute_A_fkey` FOREIGN KEY (`A`) REFERENCES `Attribute`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AttributeToProductAttribute` ADD CONSTRAINT `_AttributeToProductAttribute_B_fkey` FOREIGN KEY (`B`) REFERENCES `ProductAttribute`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProductVariationToVariation` ADD CONSTRAINT `_ProductVariationToVariation_A_fkey` FOREIGN KEY (`A`) REFERENCES `ProductVariation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProductVariationToVariation` ADD CONSTRAINT `_ProductVariationToVariation_B_fkey` FOREIGN KEY (`B`) REFERENCES `Variation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProductAttributeToProductVariation` ADD CONSTRAINT `_ProductAttributeToProductVariation_A_fkey` FOREIGN KEY (`A`) REFERENCES `ProductAttribute`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProductAttributeToProductVariation` ADD CONSTRAINT `_ProductAttributeToProductVariation_B_fkey` FOREIGN KEY (`B`) REFERENCES `ProductVariation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
