/*
  Warnings:

  - You are about to drop the column `price` on the `VariationAttribute` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `VariationAttribute` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "VariationValue" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" TEXT,
    "quantity" TEXT,
    "variationAttributeId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    CONSTRAINT "VariationValue_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "VariationValue_variationAttributeId_fkey" FOREIGN KEY ("variationAttributeId") REFERENCES "VariationAttribute" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_VariationAttribute" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "productVariationId" TEXT NOT NULL,
    CONSTRAINT "VariationAttribute_productVariationId_fkey" FOREIGN KEY ("productVariationId") REFERENCES "ProductVariation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_VariationAttribute" ("description", "id", "name", "productVariationId") SELECT "description", "id", "name", "productVariationId" FROM "VariationAttribute";
DROP TABLE "VariationAttribute";
ALTER TABLE "new_VariationAttribute" RENAME TO "VariationAttribute";
CREATE TABLE "new_ProductVariation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "productId" TEXT NOT NULL
);
INSERT INTO "new_ProductVariation" ("description", "id", "name", "productId") SELECT "description", "id", "name", "productId" FROM "ProductVariation";
DROP TABLE "ProductVariation";
ALTER TABLE "new_ProductVariation" RENAME TO "ProductVariation";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
