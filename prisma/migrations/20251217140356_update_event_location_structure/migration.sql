/*
  Warnings:

  - You are about to drop the column `location` on the `events` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "LocationType" AS ENUM ('ONLINE', 'IN_PERSON');

-- AlterTable
ALTER TABLE "events" DROP COLUMN "location",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "locationType" "LocationType" NOT NULL DEFAULT 'IN_PERSON',
ADD COLUMN     "onlineUrl" TEXT;
