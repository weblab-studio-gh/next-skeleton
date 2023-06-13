/*
  Warnings:

  - You are about to drop the `VariationAttribute` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VariationValue` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `variationId` to the `ProductVariation` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "VariationAttribute";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "VariationValue";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "variation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT
);

-- CreateTable
CREATE TABLE "attribute" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT
);

-- CreateTable
CREATE TABLE "ProductAttribute" (
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
    "productVariationId" TEXT NOT NULL,
    "attributeId" TEXT NOT NULL,
    CONSTRAINT "ProductAttribute_productVariationId_fkey" FOREIGN KEY ("productVariationId") REFERENCES "ProductVariation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProductAttribute_attributeId_fkey" FOREIGN KEY ("attributeId") REFERENCES "attribute" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_attributeTovariation" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_attributeTovariation_A_fkey" FOREIGN KEY ("A") REFERENCES "attribute" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_attributeTovariation_B_fkey" FOREIGN KEY ("B") REFERENCES "variation" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProductVariation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "productId" TEXT NOT NULL,
    "variationId" TEXT NOT NULL,
    CONSTRAINT "ProductVariation_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProductVariation_variationId_fkey" FOREIGN KEY ("variationId") REFERENCES "variation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ProductVariation" ("description", "id", "name", "productId") SELECT "description", "id", "name", "productId" FROM "ProductVariation";
DROP TABLE "ProductVariation";
ALTER TABLE "new_ProductVariation" RENAME TO "ProductVariation";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "ProductAttribute_productVariationId_key" ON "ProductAttribute"("productVariationId");

-- CreateIndex
CREATE UNIQUE INDEX "_attributeTovariation_AB_unique" ON "_attributeTovariation"("A", "B");

-- CreateIndex
CREATE INDEX "_attributeTovariation_B_index" ON "_attributeTovariation"("B");
