/*
  Warnings:

  - You are about to drop the column `ipv4` on the `NewsletterIPUsers` table. All the data in the column will be lost.
  - Added the required column `ipv6` to the `NewsletterIPUsers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "NewsletterIPUsers" DROP COLUMN "ipv4",
ADD COLUMN     "ipv6" TEXT NOT NULL;
