/*
  Warnings:

  - You are about to drop the column `beoordeling` on the `Opdracht` table. All the data in the column will be lost.
  - The primary key for the `Pand` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `pandId` on the `Pand` table. All the data in the column will be lost.
  - Added the required column `pandId` to the `Opdracht` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Opdracht" DROP COLUMN "beoordeling",
ADD COLUMN     "pandId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Pand" DROP CONSTRAINT "Pand_pkey",
DROP COLUMN "pandId",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Pand_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Opdracht" ADD CONSTRAINT "Opdracht_pandId_fkey" FOREIGN KEY ("pandId") REFERENCES "Pand"("id") ON DELETE CASCADE ON UPDATE CASCADE;
