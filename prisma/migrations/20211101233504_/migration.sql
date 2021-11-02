/*
  Warnings:

  - You are about to drop the column `id` on the `Information` table. All the data in the column will be lost.
  - You are about to drop the column `userDbid` on the `Record` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `dbid` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Record" DROP CONSTRAINT "Record_userDbid_fkey";

-- AlterTable
ALTER TABLE "Information" DROP COLUMN "id";

-- AlterTable
ALTER TABLE "Record" DROP COLUMN "userDbid",
ADD COLUMN     "userId" INTEGER;

-- AlterTable
CREATE SEQUENCE "user_id_seq";
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "dbid",
ALTER COLUMN "id" SET DEFAULT nextval('user_id_seq'),
ADD PRIMARY KEY ("id");
ALTER SEQUENCE "user_id_seq" OWNED BY "User"."id";

-- CreateIndex
CREATE UNIQUE INDEX "User.id_unique" ON "User"("id");

-- AddForeignKey
ALTER TABLE "Record" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
