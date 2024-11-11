-- DropForeignKey
ALTER TABLE "Slot" DROP CONSTRAINT "Slot_serDocId_fkey";

-- AlterTable
ALTER TABLE "Slot" ALTER COLUMN "serDocId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Slot" ADD CONSTRAINT "Slot_serDocId_fkey" FOREIGN KEY ("serDocId") REFERENCES "ServiceDoctor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
