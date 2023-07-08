-- CreateTable
CREATE TABLE "Release" (
    "id" TEXT NOT NULL,
    "tagName" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "publishedAt" TIMESTAMP(3) NOT NULL,
    "organizationId" TEXT NOT NULL,

    CONSTRAINT "Release_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Release" ADD CONSTRAINT "Release_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
