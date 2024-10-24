/*
  Warnings:

  - The `slots` column on the `ServiceDoctor` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Doctor" ALTER COLUMN "experience" DROP DEFAULT;

-- AlterTable
ALTER TABLE "ServiceDoctor" DROP COLUMN "slots",
ADD COLUMN     "slots" TIMESTAMP(3)[] DEFAULT ARRAY['2023-10-10 10:00:00 +00:00']::TIMESTAMP(3)[];
