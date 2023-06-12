/*
  Warnings:

  - You are about to drop the column `productId` on the `ProductImage` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProductImage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "path" TEXT NOT NULL
);
INSERT INTO "new_ProductImage" ("description", "id", "name", "path") SELECT "description", "id", "name", "path" FROM "ProductImage";
DROP TABLE "ProductImage";
ALTER TABLE "new_ProductImage" RENAME TO "ProductImage";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
