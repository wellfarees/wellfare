/*
  Warnings:

  - Made the column `encryptedFeelsID` on table `Record` required. This step will fail if there are existing NULL values in that column.
  - Made the column `encryptedGrID` on table `Record` required. This step will fail if there are existing NULL values in that column.
  - Made the column `encryptedUneaseID` on table `Record` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Record" DROP CONSTRAINT "Record_encryptedFeelsID_fkey";

-- DropForeignKey
ALTER TABLE "Record" DROP CONSTRAINT "Record_encryptedGrID_fkey";

-- DropForeignKey
ALTER TABLE "Record" DROP CONSTRAINT "Record_encryptedUneaseID_fkey";

-- AlterTable
ALTER TABLE "Record" ALTER COLUMN "encryptedFeelsID" SET NOT NULL,
ALTER COLUMN "encryptedGrID" SET NOT NULL,
ALTER COLUMN "encryptedUneaseID" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_encryptedGrID_fkey" FOREIGN KEY ("encryptedGrID") REFERENCES "EncryptedGrPiece"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_encryptedUneaseID_fkey" FOREIGN KEY ("encryptedUneaseID") REFERENCES "EncryptedUneasePiece"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_encryptedFeelsID_fkey" FOREIGN KEY ("encryptedFeelsID") REFERENCES "EncryptedFeelsPiece"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
