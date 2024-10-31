-- CreateEnum
CREATE TYPE "SlotStatus" AS ENUM ('OPEN', 'BOOKED');

-- CreateTable
CREATE TABLE "Slot" (
    "id" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "status" "SlotStatus" NOT NULL DEFAULT 'OPEN',
    "doctorId" TEXT NOT NULL,
    "serviceDoctorId" TEXT NOT NULL,

    CONSTRAINT "Slot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Slot_doctorId_startTime_idx" ON "Slot"("doctorId", "startTime");

-- CreateIndex
CREATE UNIQUE INDEX "Slot_doctorId_startTime_key" ON "Slot"("doctorId", "startTime");

-- AddForeignKey
ALTER TABLE "Slot" ADD CONSTRAINT "Slot_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Slot" ADD CONSTRAINT "Slot_serviceDoctorId_fkey" FOREIGN KEY ("serviceDoctorId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
