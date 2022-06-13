/*
  Warnings:

  - You are about to drop the `IPUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `ipv6` to the `NewsletterIPUsers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "IPUser" DROP CONSTRAINT "IPUser_newsletterIPUsersId_fkey";

-- AlterTable
ALTER TABLE "NewsletterIPUsers" ADD COLUMN     "ipv6" TEXT NOT NULL,
ADD COLUMN     "subRecords" TIMESTAMP(3)[];

-- DropTable
DROP TABLE "IPUser";
