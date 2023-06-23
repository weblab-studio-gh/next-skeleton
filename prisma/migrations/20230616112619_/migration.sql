/*
  Warnings:

  - You are about to drop the column `paymentTypeId` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `paymentTypeId` on the `transaction` table. All the data in the column will be lost.
  - You are about to drop the `paymenttype` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `type` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_paymentTypeId_fkey`;

-- DropForeignKey
ALTER TABLE `transaction` DROP FOREIGN KEY `Transaction_paymentTypeId_fkey`;

-- DropIndex
DROP INDEX `Order_vatId_fkey` ON `order`;

-- DropIndex
DROP INDEX `SupplierOrder_statusId_fkey` ON `supplierorder`;

-- DropIndex
DROP INDEX `Transaction_vatId_fkey` ON `transaction`;

-- DropIndex
DROP INDEX `User_typeId_fkey` ON `user`;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `paymentTypeId`;

-- AlterTable
ALTER TABLE `payment` ADD COLUMN `type` ENUM('CASH', 'CARD', 'TRANSFER') NOT NULL;

-- AlterTable
ALTER TABLE `transaction` DROP COLUMN `paymentTypeId`;

-- DropTable
DROP TABLE `paymenttype`;
