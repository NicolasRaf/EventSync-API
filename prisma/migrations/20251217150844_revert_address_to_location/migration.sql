/*
  Warnings:

  - You are about to drop the column `address` on the `events` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "events" DROP COLUMN "address",
ADD COLUMN     "location" TEXT;
