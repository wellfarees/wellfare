/*
  Warnings:

  - The primary key for the `Emoji` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Emoji` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Record` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Record` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `emojiId` on the `Record` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Record" DROP CONSTRAINT "Record_emojiId_fkey";

-- AlterTable
ALTER TABLE "Emoji" DROP CONSTRAINT "Emoji_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Emoji_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Record" DROP CONSTRAINT "Record_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "emojiId",
ADD COLUMN     "emojiId" INTEGER NOT NULL,
ADD CONSTRAINT "Record_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_emojiId_fkey" FOREIGN KEY ("emojiId") REFERENCES "Emoji"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
