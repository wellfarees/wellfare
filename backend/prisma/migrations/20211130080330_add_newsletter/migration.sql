-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "informationId" TEXT NOT NULL,
    "affirmations" TEXT,
    "configurationId" TEXT NOT NULL,
    "lastIndex" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Information" (
    "dbid" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "pfp" TEXT,

    CONSTRAINT "Information_pkey" PRIMARY KEY ("dbid")
);

-- CreateTable
CREATE TABLE "Configuration" (
    "id" TEXT NOT NULL,
    "darkMode" BOOLEAN NOT NULL DEFAULT false,
    "reducedMotion" BOOLEAN NOT NULL DEFAULT false,
    "fontSize" INTEGER NOT NULL DEFAULT 14,

    CONSTRAINT "Configuration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Record" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "unease" TEXT NOT NULL,
    "gratefulness" TEXT NOT NULL,
    "emoji" TEXT NOT NULL,
    "feelings" TEXT NOT NULL,
    "userId" INTEGER,
    "recapId" INTEGER,

    CONSTRAINT "Record_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recap" (
    "id" SERIAL NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "Recap_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Newsletter" (
    "email" TEXT NOT NULL,

    CONSTRAINT "Newsletter_pkey" PRIMARY KEY ("email")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Recap_id_key" ON "Recap"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Newsletter_email_key" ON "Newsletter"("email");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_configurationId_fkey" FOREIGN KEY ("configurationId") REFERENCES "Configuration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_informationId_fkey" FOREIGN KEY ("informationId") REFERENCES "Information"("dbid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_recapId_fkey" FOREIGN KEY ("recapId") REFERENCES "Recap"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recap" ADD CONSTRAINT "Recap_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
