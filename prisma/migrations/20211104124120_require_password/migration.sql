/*
  Warnings:

  - Made the column `password` on table `Information` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Information" ALTER COLUMN "password" SET NOT NULL;
