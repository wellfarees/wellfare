-- AlterTable
ALTER TABLE "User" ADD COLUMN     "affID" TEXT;

-- CreateTable
CREATE TABLE "EncryptedAffirmations" (
    "iv" TEXT,
    "content" TEXT,
    "id" TEXT NOT NULL,

    CONSTRAINT "EncryptedAffirmations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EncryptedAffirmations_id_key" ON "EncryptedAffirmations"("id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_affID_fkey" FOREIGN KEY ("affID") REFERENCES "EncryptedAffirmations"("id") ON DELETE SET NULL ON UPDATE CASCADE;
