/*
  Warnings:

  - Added the required column `prId` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "prId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_prId_fkey" FOREIGN KEY ("prId") REFERENCES "Pr"("id") ON DELETE CASCADE ON UPDATE CASCADE;
