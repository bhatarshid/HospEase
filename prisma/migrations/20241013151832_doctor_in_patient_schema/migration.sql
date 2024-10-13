/*
  Warnings:

  - Added the required column `primaryPhysician` to the `Patient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "primaryPhysician" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_primaryPhysician_fkey" FOREIGN KEY ("primaryPhysician") REFERENCES "Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
