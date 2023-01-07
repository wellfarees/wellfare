/*
  Warnings:

  - You are about to drop the column `feelings` on the `Record` table. All the data in the column will be lost.
  - You are about to drop the column `gratefulness` on the `Record` table. All the data in the column will be lost.
  - You are about to drop the column `unease` on the `Record` table. All the data in the column will be lost.
  - You are about to drop the column `affirmations` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Record" DROP COLUMN "feelings",
DROP COLUMN "gratefulness",
DROP COLUMN "unease";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "affirmations";
