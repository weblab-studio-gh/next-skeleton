/*
  Warnings:

  - A unique constraint covering the columns `[profileId]` on the table `Integration` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Integration_profileId_key" ON "Integration"("profileId");
