/*
  Warnings:

  - You are about to drop the column `firstName` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `picture` on the `Doctor` table. All the data in the column will be lost.
  - Added the required column `userType` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('ADMIN', 'DOCTOR', 'PATIENT');

-- DropIndex
DROP INDEX "Doctor_phoneNumber_key";

-- AlterTable
ALTER TABLE "Doctor" DROP COLUMN "firstName",
DROP COLUMN "lastName",
DROP COLUMN "phoneNumber",
DROP COLUMN "picture";

-- AlterTable
ALTER TABLE "Slot" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "userType" "UserType" NOT NULL;
