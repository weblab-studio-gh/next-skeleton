-- AlterTable
ALTER TABLE `product` ADD COLUMN `featured` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `onStore` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `onWeb` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `soldOut` BOOLEAN NOT NULL DEFAULT false;
