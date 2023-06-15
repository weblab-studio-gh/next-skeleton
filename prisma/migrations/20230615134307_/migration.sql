/*
  Warnings:

  - You are about to drop the column `productId` on the `productattribute` table. All the data in the column will be lost.
  - The primary key for the `productvariation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `id` was added to the `ProductVariation` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE `productattribute` DROP FOREIGN KEY `ProductAttribute_productVariationId_productId_fkey`;

-- DropIndex
DROP INDEX `ProductAttribute_productId_key` ON `productattribute`;

-- DropIndex
DROP INDEX `ProductAttribute_productVariationId_key` ON `productattribute`;

-- AlterTable
ALTER TABLE `productattribute` DROP COLUMN `productId`;

-- AlterTable
ALTER TABLE `productvariation` DROP PRIMARY KEY,
    ADD COLUMN `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- CreateIndex
CREATE INDEX `ProductVariation_productId_variationId_idx` ON `ProductVariation`(`productId`, `variationId`);

-- AddForeignKey
ALTER TABLE `ProductAttribute` ADD CONSTRAINT `ProductAttribute_productVariationId_fkey` FOREIGN KEY (`productVariationId`) REFERENCES `ProductVariation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
