/*
  Warnings:

  - Added the required column `name` to the `ProductImage` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProductImage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "path" TEXT NOT NULL,
    "productId" TEXT NOT NULL
);
INSERT INTO "new_ProductImage" ("id", "path", "productId") SELECT "id", "path", "productId" FROM "ProductImage";
DROP TABLE "ProductImage";
ALTER TABLE "new_ProductImage" RENAME TO "ProductImage";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
