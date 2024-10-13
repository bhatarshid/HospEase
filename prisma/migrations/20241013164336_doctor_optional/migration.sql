-- DropForeignKey
ALTER TABLE "Patient" DROP CONSTRAINT "Patient_primaryPhysician_fkey";

-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "insurancePolicyNumber" TEXT,
ADD COLUMN     "insuranceProvider" TEXT,
ALTER COLUMN "primaryPhysician" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_primaryPhysician_fkey" FOREIGN KEY ("primaryPhysician") REFERENCES "Doctor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
