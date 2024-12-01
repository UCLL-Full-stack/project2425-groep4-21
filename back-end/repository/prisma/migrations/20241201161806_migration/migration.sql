/*
  Warnings:

  - Made the column `pilotId` on table `Opdracht` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Opdracht" ALTER COLUMN "pilotId" SET NOT NULL;
