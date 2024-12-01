/*
  Warnings:

  - Added the required column `piliotId` to the `Opdracht` table without a default value. This is not possible if the table is not empty.
  - Added the required column `realtorId` to the `Opdracht` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Opdracht" ADD COLUMN     "piliotId" INTEGER NOT NULL,
ADD COLUMN     "realtorId" INTEGER NOT NULL;
