-- AlterTable
ALTER TABLE "Record" ADD COLUMN     "encryptedFeelsID" TEXT,
ADD COLUMN     "encryptedGrID" TEXT,
ADD COLUMN     "encryptedUneaseID" TEXT;

-- CreateTable
CREATE TABLE "EncryptedGrPiece" (
    "iv" TEXT,
    "content" TEXT,
    "id" TEXT NOT NULL,

    CONSTRAINT "EncryptedGrPiece_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EncryptedUneasePiece" (
    "iv" TEXT,
    "content" TEXT,
    "id" TEXT NOT NULL,

    CONSTRAINT "EncryptedUneasePiece_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EncryptedFeelsPiece" (
    "iv" TEXT,
    "content" TEXT,
    "id" TEXT NOT NULL,

    CONSTRAINT "EncryptedFeelsPiece_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EncryptedGrPiece_id_key" ON "EncryptedGrPiece"("id");

-- CreateIndex
CREATE UNIQUE INDEX "EncryptedUneasePiece_id_key" ON "EncryptedUneasePiece"("id");

-- CreateIndex
CREATE UNIQUE INDEX "EncryptedFeelsPiece_id_key" ON "EncryptedFeelsPiece"("id");

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_encryptedGrID_fkey" FOREIGN KEY ("encryptedGrID") REFERENCES "EncryptedGrPiece"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_encryptedUneaseID_fkey" FOREIGN KEY ("encryptedUneaseID") REFERENCES "EncryptedUneasePiece"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_encryptedFeelsID_fkey" FOREIGN KEY ("encryptedFeelsID") REFERENCES "EncryptedFeelsPiece"("id") ON DELETE SET NULL ON UPDATE CASCADE;
