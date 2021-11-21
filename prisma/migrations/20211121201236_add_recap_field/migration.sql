-- AlterTable
ALTER TABLE "Record" ADD COLUMN     "recapId" INTEGER;

-- CreateTable
CREATE TABLE "Recap" (
    "id" SERIAL NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "Recap_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Recap_id_key" ON "Recap"("id");

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_recapId_fkey" FOREIGN KEY ("recapId") REFERENCES "Recap"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recap" ADD CONSTRAINT "Recap_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
