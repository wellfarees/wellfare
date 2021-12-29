/*
  Warnings:

  - Added the required column `associatedEmail` to the `Information` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Information" ADD COLUMN     "associatedEmail" TEXT NOT NULL;
