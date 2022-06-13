/*
  Warnings:

  - You are about to drop the `Subscription` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "NewsletterUser" ADD COLUMN     "relation" INTEGER;

-- DropTable
DROP TABLE "Subscription";
