/*
  Warnings:

  - The primary key for the `productvariation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `productvariation` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[productId]` on the table `ProductAttribute` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `productId` to the `ProductAttribute` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `productattribute` DROP FOREIGN KEY `ProductAttribute_productVariationId_fkey`;

-- AlterTable
ALTER TABLE `productattribute` ADD COLUMN `productId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `productvariation` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`productId`, `variationId`);

-- CreateIndex
CREATE UNIQUE INDEX `ProductAttribute_productId_key` ON `ProductAttribute`(`productId`);

-- AddForeignKey
ALTER TABLE `ProductAttribute` ADD CONSTRAINT `ProductAttribute_productVariationId_productId_fkey` FOREIGN KEY (`productVariationId`, `productId`) REFERENCES `ProductVariation`(`productId`, `variationId`) ON DELETE RESTRICT ON UPDATE CASCADE;
