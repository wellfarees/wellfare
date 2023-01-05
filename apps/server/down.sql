-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_affID_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "affID";

-- DropTable
DROP TABLE "EncryptedAffirmations";
