/*
  Warnings:

  - You are about to drop the `ProductGallery` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `image` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProductVariation" ADD COLUMN "description" TEXT;

-- AlterTable
ALTER TABLE "VariationAttribute" ADD COLUMN "description" TEXT;
ALTER TABLE "VariationAttribute" ADD COLUMN "price" TEXT;
ALTER TABLE "VariationAttribute" ADD COLUMN "quantity" TEXT;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ProductGallery";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "ProductImage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "path" TEXT NOT NULL,
    "productId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ProductToProductImage" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ProductToProductImage_A_fkey" FOREIGN KEY ("A") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ProductToProductImage_B_fkey" FOREIGN KEY ("B") REFERENCES "ProductImage" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" TEXT,
    "quantity" TEXT,
    "barcode" TEXT,
    "sku" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "imageId" TEXT,
    CONSTRAINT "Product_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "ProductImage" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Product" ("barcode", "createdAt", "description", "id", "name", "price", "published", "quantity", "updatedAt") SELECT "barcode", "createdAt", "description", "id", "name", "price", "published", "quantity", "updatedAt" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE UNIQUE INDEX "Product_imageId_key" ON "Product"("imageId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToProductImage_AB_unique" ON "_ProductToProductImage"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToProductImage_B_index" ON "_ProductToProductImage"("B");
