/*
  Warnings:

  - You are about to drop the column `emojiId` on the `Record` table. All the data in the column will be lost.
  - You are about to drop the `Emoji` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `feelings` to the `Record` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Record" DROP CONSTRAINT "Record_emojiId_fkey";

-- AlterTable
ALTER TABLE "Record" DROP COLUMN "emojiId",
ADD COLUMN     "feelings" TEXT NOT NULL;

-- DropTable
DROP TABLE "Emoji";
