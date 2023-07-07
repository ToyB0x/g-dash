-- CreateTable
CREATE TABLE "Commit" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "resourcePath" TEXT NOT NULL,
    "committedDate" TIMESTAMP(3) NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "Commit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Commit_organizationId_committedDate_idx" ON "Commit"("organizationId", "committedDate");

-- AddForeignKey
ALTER TABLE "Commit" ADD CONSTRAINT "Commit_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commit" ADD CONSTRAINT "Commit_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
