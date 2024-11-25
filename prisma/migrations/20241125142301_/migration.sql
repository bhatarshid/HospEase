/*
  Warnings:

  - You are about to drop the column `appointmentDate` on the `Appointment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[appointmentId]` on the table `Appointment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `appointmentId` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "appointmentDate",
ADD COLUMN     "appointmentId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Appointment_appointmentId_key" ON "Appointment"("appointmentId");

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "Slot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
