/*
  Warnings:

  - Added the required column `repositoryId` to the `Pr` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pr" ADD COLUMN     "repositoryId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Pr" ADD CONSTRAINT "Pr_repositoryId_fkey" FOREIGN KEY ("repositoryId") REFERENCES "Repository"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
