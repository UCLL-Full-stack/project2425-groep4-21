-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'piloot', 'makelaar');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "voornaam" TEXT NOT NULL,
    "naam" TEXT NOT NULL,
    "gebruikersnaam" TEXT NOT NULL,
    "rol" "Role" NOT NULL,
    "emailadres" TEXT NOT NULL,
    "portfolio" TEXT NOT NULL,
    "niveau" TEXT NOT NULL,
    "bevoegdheden" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pand" (
    "pandId" SERIAL NOT NULL,
    "adres" TEXT NOT NULL,
    "beschrijving" TEXT NOT NULL,
    "userIdMakelaar" INTEGER NOT NULL,

    CONSTRAINT "Pand_pkey" PRIMARY KEY ("pandId")
);

-- CreateTable
CREATE TABLE "Opdracht" (
    "opdrachtnummer" SERIAL NOT NULL,
    "datum" TIMESTAMP(3) NOT NULL,
    "beoordeling" TEXT NOT NULL,
    "puntentotaal" INTEGER NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Opdracht_pkey" PRIMARY KEY ("opdrachtnummer")
);

-- CreateTable
CREATE TABLE "Media" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "bestandslocatie" TEXT NOT NULL,
    "uploadDatum" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Beoordeling" (
    "beoordelingId" SERIAL NOT NULL,
    "score" INTEGER NOT NULL,
    "opmerkingen" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Beoordeling_pkey" PRIMARY KEY ("beoordelingId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_gebruikersnaam_key" ON "User"("gebruikersnaam");

-- CreateIndex
CREATE UNIQUE INDEX "User_emailadres_key" ON "User"("emailadres");

-- AddForeignKey
ALTER TABLE "Pand" ADD CONSTRAINT "Pand_userIdMakelaar_fkey" FOREIGN KEY ("userIdMakelaar") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
