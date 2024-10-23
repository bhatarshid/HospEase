/*
  Warnings:

  - You are about to drop the column `features` on the `ServiceDoctor` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Doctor" ADD COLUMN     "experience" TEXT NOT NULL DEFAULT '5 Years';

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "features" TEXT[];

-- AlterTable
ALTER TABLE "ServiceDoctor" DROP COLUMN "features";
