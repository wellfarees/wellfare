/*
  Warnings:

  - A unique constraint covering the columns `[dbid]` on the table `Information` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Information_dbid_key" ON "Information"("dbid");
