/*
  Warnings:

  - You are about to drop the column `statusId` on the `order` table. All the data in the column will be lost.
  - You are about to alter the column `total` on the `order` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `price` on the `product` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `total` on the `transaction` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to drop the `orderstatus` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `usertype` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `vat` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `price` to the `ProductVariationOptions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_statusId_fkey`;

-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_vatId_fkey`;

-- DropForeignKey
ALTER TABLE `supplierorder` DROP FOREIGN KEY `SupplierOrder_statusId_fkey`;

-- DropForeignKey
ALTER TABLE `transaction` DROP FOREIGN KEY `Transaction_vatId_fkey`;

-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_typeId_fkey`;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `statusId`,
    ADD COLUMN `Vat` ENUM('VAT_0', 'VAT_10', 'VAT_27') NOT NULL DEFAULT 'VAT_0',
    ADD COLUMN `status` ENUM('PENDING', 'COMPLETED', 'CANCELLED') NOT NULL DEFAULT 'PENDING',
    MODIFY `total` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `product` MODIFY `price` INTEGER NULL;

-- AlterTable
ALTER TABLE `productvariationoptions` ADD COLUMN `description` VARCHAR(191) NULL,
    ADD COLUMN `price` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `supplierorder` ADD COLUMN `status` ENUM('PENDING', 'COMPLETED', 'CANCELLED') NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE `transaction` ADD COLUMN `Vat` ENUM('VAT_0', 'VAT_10', 'VAT_27') NOT NULL DEFAULT 'VAT_0',
    MODIFY `total` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `type` ENUM('ADMIN', 'COSTUMER', 'STAFF') NOT NULL DEFAULT 'COSTUMER';

-- DropTable
DROP TABLE `orderstatus`;

-- DropTable
DROP TABLE `usertype`;

-- DropTable
DROP TABLE `vat`;
