/*
  Warnings:

  - You are about to drop the `_attributeTovariation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `attribute` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `variation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "_attributeTovariation_B_index";

-- DropIndex
DROP INDEX "_attributeTovariation_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_attributeTovariation";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "attribute";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "variation";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Variation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT
);

-- CreateTable
CREATE TABLE "Attribute" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT
);

-- CreateTable
CREATE TABLE "_AttributeToVariation" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_AttributeToVariation_A_fkey" FOREIGN KEY ("A") REFERENCES "Attribute" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_AttributeToVariation_B_fkey" FOREIGN KEY ("B") REFERENCES "Variation" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProductAttribute" (
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
    CONSTRAINT "ProductAttribute_attributeId_fkey" FOREIGN KEY ("attributeId") REFERENCES "Attribute" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ProductAttribute" ("attributeId", "barcode", "createdAt", "description", "id", "name", "price", "productVariationId", "published", "quantity", "sku", "updatedAt") SELECT "attributeId", "barcode", "createdAt", "description", "id", "name", "price", "productVariationId", "published", "quantity", "sku", "updatedAt" FROM "ProductAttribute";
DROP TABLE "ProductAttribute";
ALTER TABLE "new_ProductAttribute" RENAME TO "ProductAttribute";
CREATE UNIQUE INDEX "ProductAttribute_productVariationId_key" ON "ProductAttribute"("productVariationId");
CREATE TABLE "new_ProductVariation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "productId" TEXT NOT NULL,
    "variationId" TEXT NOT NULL,
    CONSTRAINT "ProductVariation_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProductVariation_variationId_fkey" FOREIGN KEY ("variationId") REFERENCES "Variation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ProductVariation" ("description", "id", "name", "productId", "variationId") SELECT "description", "id", "name", "productId", "variationId" FROM "ProductVariation";
DROP TABLE "ProductVariation";
ALTER TABLE "new_ProductVariation" RENAME TO "ProductVariation";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_AttributeToVariation_AB_unique" ON "_AttributeToVariation"("A", "B");

-- CreateIndex
CREATE INDEX "_AttributeToVariation_B_index" ON "_AttributeToVariation"("B");
