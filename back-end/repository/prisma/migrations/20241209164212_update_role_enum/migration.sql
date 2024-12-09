/*
  Warnings:

  - The values [piloot,makelaar] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('admin', 'pilot', 'realtor');
ALTER TABLE "User" ALTER COLUMN "rol" TYPE "Role_new" USING ("rol"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
COMMIT;
