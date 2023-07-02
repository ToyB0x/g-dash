/*
  Warnings:

  - Added the required column `pushedAt` to the `Repository` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Repository" ADD COLUMN     "pushedAt" TIMESTAMP(3) NOT NULL;
