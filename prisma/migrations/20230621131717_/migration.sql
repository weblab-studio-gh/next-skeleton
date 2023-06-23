/*
  Warnings:

  - Added the required column `variationOptionId` to the `ProductVariationOptions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `productvariationoptions` ADD COLUMN `variationOptionId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `ProductVariationOptions` ADD CONSTRAINT `ProductVariationOptions_variationOptionId_fkey` FOREIGN KEY (`variationOptionId`) REFERENCES `VariationOptions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
