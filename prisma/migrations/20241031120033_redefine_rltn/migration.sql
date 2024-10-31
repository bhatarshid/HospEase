-- DropForeignKey
ALTER TABLE "Slot" DROP CONSTRAINT "Slot_serviceDoctorId_fkey";

-- AddForeignKey
ALTER TABLE "Slot" ADD CONSTRAINT "Slot_serviceDoctorId_fkey" FOREIGN KEY ("serviceDoctorId") REFERENCES "ServiceDoctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
