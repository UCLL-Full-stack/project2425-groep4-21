-- AlterTable
ALTER TABLE "Opdracht" ALTER COLUMN "pilotId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "userBeoordeling" (
    "userId" INTEGER NOT NULL,
    "beoordelingId" INTEGER NOT NULL,

    CONSTRAINT "userBeoordeling_pkey" PRIMARY KEY ("userId","beoordelingId")
);

-- AddForeignKey
ALTER TABLE "userBeoordeling" ADD CONSTRAINT "userBeoordeling_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userBeoordeling" ADD CONSTRAINT "userBeoordeling_beoordelingId_fkey" FOREIGN KEY ("beoordelingId") REFERENCES "Beoordeling"("beoordelingId") ON DELETE RESTRICT ON UPDATE CASCADE;
