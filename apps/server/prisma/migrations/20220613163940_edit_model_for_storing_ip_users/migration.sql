/*
  Warnings:

  - You are about to drop the column `ipv6` on the `NewsletterIPUsers` table. All the data in the column will be lost.
  - You are about to drop the column `lastSubscribed` on the `NewsletterIPUsers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "NewsletterIPUsers" DROP COLUMN "ipv6",
DROP COLUMN "lastSubscribed";

-- CreateTable
CREATE TABLE "IPUser" (
    "id" TEXT NOT NULL,
    "ipv6" TEXT NOT NULL,
    "subRecords" TIMESTAMP(3)[],
    "newsletterIPUsersId" TEXT,

    CONSTRAINT "IPUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "IPUser_id_key" ON "IPUser"("id");

-- AddForeignKey
ALTER TABLE "IPUser" ADD CONSTRAINT "IPUser_newsletterIPUsersId_fkey" FOREIGN KEY ("newsletterIPUsersId") REFERENCES "NewsletterIPUsers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
