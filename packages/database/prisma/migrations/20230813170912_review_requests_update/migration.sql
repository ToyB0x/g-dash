/*
  Warnings:

  - Added the required column `requestUserId` to the `ReviewRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ReviewRequest" ADD COLUMN     "requestUserId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ReviewRequest" ADD CONSTRAINT "ReviewRequest_requestUserId_fkey" FOREIGN KEY ("requestUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
