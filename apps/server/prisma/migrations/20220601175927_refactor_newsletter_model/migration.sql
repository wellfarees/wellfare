/*
  Warnings:

  - You are about to drop the `Newsletter` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Newsletter";

-- CreateTable
CREATE TABLE "NewsletterUser" (
    "email" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "NewsletterUser_pkey" PRIMARY KEY ("email")
);

-- CreateIndex
CREATE UNIQUE INDEX "NewsletterUser_email_key" ON "NewsletterUser"("email");

-- AddForeignKey
ALTER TABLE "NewsletterUser" ADD CONSTRAINT "NewsletterUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
