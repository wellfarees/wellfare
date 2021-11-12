/*
  Warnings:

  - You are about to drop the column `description` on the `Record` table. All the data in the column will be lost.
  - Added the required column `gratefulness` to the `Record` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unease` to the `Record` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Record" DROP COLUMN "description",
ADD COLUMN     "gratefulness" TEXT NOT NULL,
ADD COLUMN     "unease" TEXT NOT NULL;

-- DropEnum
DROP TYPE "Mood";
