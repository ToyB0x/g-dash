-- TODO: SQLファイルの整理とRLSの有効化状況一覧を作成
-- https://github.com/users/ToyB0x/projects/1/views/1?pane=issue&itemId=32242950

-- CreateTable
CREATE TABLE "Organization" (
    "id" TEXT NOT NULL,
    "login" TEXT NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Repository" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,

    CONSTRAINT "Repository_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Organization_login_key" ON "Organization"("login");

-- AddForeignKey
ALTER TABLE "Repository" ADD CONSTRAINT "Repository_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
