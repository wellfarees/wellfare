/*
  Warnings:

  - The primary key for the `NewsletterUser` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "NewsletterUser" DROP CONSTRAINT "NewsletterUser_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "NewsletterUser_pkey" PRIMARY KEY ("id");
