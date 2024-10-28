/*
  Warnings:

  - You are about to drop the column `closed` on the `Appointment` table. All the data in the column will be lost.
  - The `status` column on the `Appointment` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "AppointmentStatus" AS ENUM ('CLOSED', 'CONFIRMED', 'PENDING', 'COMPLETED');

-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "closed",
DROP COLUMN "status",
ADD COLUMN     "status" "AppointmentStatus" NOT NULL DEFAULT 'PENDING';
