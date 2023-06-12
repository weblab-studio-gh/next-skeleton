-- CreateTable
CREATE TABLE "ProductType" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT
);

-- CreateTable
CREATE TABLE "ProductSubCategory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT
);

-- CreateTable
CREATE TABLE "_ProductToProductSubCategory" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ProductToProductSubCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ProductToProductSubCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "ProductSubCategory" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ProductCategoryToProductSubCategory" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ProductCategoryToProductSubCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "ProductCategory" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ProductCategoryToProductSubCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "ProductSubCategory" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ProductCategoryToProductType" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ProductCategoryToProductType_A_fkey" FOREIGN KEY ("A") REFERENCES "ProductCategory" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ProductCategoryToProductType_B_fkey" FOREIGN KEY ("B") REFERENCES "ProductType" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToProductSubCategory_AB_unique" ON "_ProductToProductSubCategory"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToProductSubCategory_B_index" ON "_ProductToProductSubCategory"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductCategoryToProductSubCategory_AB_unique" ON "_ProductCategoryToProductSubCategory"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductCategoryToProductSubCategory_B_index" ON "_ProductCategoryToProductSubCategory"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductCategoryToProductType_AB_unique" ON "_ProductCategoryToProductType"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductCategoryToProductType_B_index" ON "_ProductCategoryToProductType"("B");
