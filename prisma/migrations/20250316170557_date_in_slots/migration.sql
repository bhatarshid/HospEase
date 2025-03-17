/*
  Warnings:

  - The values [PENDING] on the enum `SlotStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `appointmentId` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `doctorId` on the `Slot` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "SlotStatus_new" AS ENUM ('OPEN', 'BOOKED');
ALTER TABLE "Slot" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Slot" ALTER COLUMN "status" TYPE "SlotStatus_new" USING ("status"::text::"SlotStatus_new");
ALTER TYPE "SlotStatus" RENAME TO "SlotStatus_old";
ALTER TYPE "SlotStatus_new" RENAME TO "SlotStatus";
DROP TYPE "SlotStatus_old";
ALTER TABLE "Slot" ALTER COLUMN "status" SET DEFAULT 'OPEN';
COMMIT;

-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_appointmentId_fkey";

-- DropForeignKey
ALTER TABLE "Slot" DROP CONSTRAINT "Slot_doctorId_fkey";

-- DropIndex
DROP INDEX "Appointment_appointmentId_key";

-- DropIndex
DROP INDEX "Slot_doctorId_startTime_idx";

-- DropIndex
DROP INDEX "Slot_doctorId_startTime_key";

-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "appointmentId";

-- AlterTable
ALTER TABLE "Slot" DROP COLUMN "doctorId",
ADD COLUMN     "bookedSlots" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "totalSlots" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
