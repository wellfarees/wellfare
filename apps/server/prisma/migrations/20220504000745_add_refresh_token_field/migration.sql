/*
  Warnings:

  - Added the required column `oauthRefresh` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "oauthRefresh" TEXT NOT NULL;
