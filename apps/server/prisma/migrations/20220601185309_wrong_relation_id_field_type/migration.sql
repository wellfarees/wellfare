/*
  Warnings:

  - You are about to drop the column `relation` on the `NewsletterUser` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "NewsletterUser" DROP COLUMN "relation",
ADD COLUMN     "relationId" TEXT;
