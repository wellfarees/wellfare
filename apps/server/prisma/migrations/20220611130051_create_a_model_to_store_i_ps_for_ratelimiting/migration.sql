-- CreateTable
CREATE TABLE "NewsletterIPUsers" (
    "id" TEXT NOT NULL,
    "ipv4" TEXT NOT NULL,
    "lastSubscribed" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NewsletterIPUsers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NewsletterIPUsers_id_key" ON "NewsletterIPUsers"("id");
