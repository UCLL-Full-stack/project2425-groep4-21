/*
  Warnings:

  - You are about to drop the column `piliotId` on the `Opdracht` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Opdracht" DROP COLUMN "piliotId",
ADD COLUMN     "pilotId" INTEGER;
