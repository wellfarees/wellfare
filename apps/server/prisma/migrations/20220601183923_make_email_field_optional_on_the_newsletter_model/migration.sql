/*
  Warnings:

  - The primary key for the `NewsletterUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `NewsletterUser` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id` to the `NewsletterUser` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "NewsletterUser_email_key";

-- AlterTable
ALTER TABLE "NewsletterUser" DROP CONSTRAINT "NewsletterUser_pkey",
ADD COLUMN     "id" INTEGER NOT NULL,
ALTER COLUMN "email" DROP NOT NULL,
ADD CONSTRAINT "NewsletterUser_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "NewsletterUser_id_key" ON "NewsletterUser"("id");
