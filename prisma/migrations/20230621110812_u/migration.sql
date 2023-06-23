/*
  Warnings:

  - You are about to drop the column `storeMargin` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `webMargin` on the `product` table. All the data in the column will be lost.
  - Added the required column `netTotal` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalVat` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `netTotal` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalVat` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `order` ADD COLUMN `netTotal` INTEGER NOT NULL,
    ADD COLUMN `totalVat` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `storeMargin`,
    DROP COLUMN `webMargin`;

-- AlterTable
ALTER TABLE `transaction` ADD COLUMN `netTotal` INTEGER NOT NULL,
    ADD COLUMN `totalVat` INTEGER NOT NULL;
