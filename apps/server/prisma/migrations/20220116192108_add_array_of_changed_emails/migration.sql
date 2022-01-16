-- CreateTable
CREATE TABLE "ChangedEmail" (
    "id" SERIAL NOT NULL,
    "address" TEXT NOT NULL,
    "set" TIMESTAMP(3) NOT NULL,
    "informationDbid" TEXT,

    CONSTRAINT "ChangedEmail_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ChangedEmail" ADD CONSTRAINT "ChangedEmail_informationDbid_fkey" FOREIGN KEY ("informationDbid") REFERENCES "Information"("dbid") ON DELETE SET NULL ON UPDATE CASCADE;
