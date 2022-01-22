/*
  Warnings:

  - The primary key for the `Information` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `dbid` on the `Information` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `uid` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `Information` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `Information` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Made the column `userId` on table `Recap` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Record` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "ChangedEmail" DROP CONSTRAINT "ChangedEmail_informationDbid_fkey";

-- DropForeignKey
ALTER TABLE "Recap" DROP CONSTRAINT "Recap_userId_fkey";

-- DropForeignKey
ALTER TABLE "Record" DROP CONSTRAINT "Record_userId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_informationId_fkey";

-- DropIndex
DROP INDEX "Information_dbid_key";

-- DropIndex
DROP INDEX "User_uid_key";

-- AlterTable
ALTER TABLE "Information" DROP CONSTRAINT "Information_pkey",
DROP COLUMN "dbid",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Information_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Recap" ALTER COLUMN "userId" SET NOT NULL,
ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Record" ALTER COLUMN "userId" SET NOT NULL,
ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "uid",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "Information_id_key" ON "Information"("id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_informationId_fkey" FOREIGN KEY ("informationId") REFERENCES "Information"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChangedEmail" ADD CONSTRAINT "ChangedEmail_informationDbid_fkey" FOREIGN KEY ("informationDbid") REFERENCES "Information"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recap" ADD CONSTRAINT "Recap_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
