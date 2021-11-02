-- DropForeignKey
ALTER TABLE "Record" DROP CONSTRAINT "Record_emojiId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_configurationId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_informationId_fkey";

-- AlterTable
ALTER TABLE "Information" ADD COLUMN     "password" TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_configurationId_fkey" FOREIGN KEY ("configurationId") REFERENCES "Configuration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_informationId_fkey" FOREIGN KEY ("informationId") REFERENCES "Information"("dbid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_emojiId_fkey" FOREIGN KEY ("emojiId") REFERENCES "Emoji"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "User.id_unique" RENAME TO "User_id_key";
