/*
  Warnings:

  - Added the required column `opdrachtId` to the `Media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Opdracht` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Media" ADD COLUMN     "opdrachtId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Opdracht" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Opdracht" ADD CONSTRAINT "Opdracht_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_opdrachtId_fkey" FOREIGN KEY ("opdrachtId") REFERENCES "Opdracht"("opdrachtnummer") ON DELETE RESTRICT ON UPDATE CASCADE;
