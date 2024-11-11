/*
  Warnings:

  - You are about to drop the column `serviceDoctorId` on the `Slot` table. All the data in the column will be lost.
  - Added the required column `serDocId` to the `Slot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "SlotStatus" ADD VALUE 'PENDING';

-- DropForeignKey
ALTER TABLE "Slot" DROP CONSTRAINT "Slot_serviceDoctorId_fkey";

-- AlterTable
ALTER TABLE "Doctor" ALTER COLUMN "experience" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Slot" DROP COLUMN "serviceDoctorId",
ADD COLUMN     "serDocId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Slot" ADD CONSTRAINT "Slot_serDocId_fkey" FOREIGN KEY ("serDocId") REFERENCES "ServiceDoctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
