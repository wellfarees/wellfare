/*
  Warnings:

  - You are about to drop the column `emoji` on the `Record` table. All the data in the column will be lost.
  - Added the required column `contents` to the `Record` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Record" DROP COLUMN "emoji",
ADD COLUMN     "contents" TEXT NOT NULL;
