-- AlterTable
ALTER TABLE "Commit" ALTER COLUMN "url" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Repository" ALTER COLUMN "vulnerabilityAlertsTotalCount" DROP DEFAULT,
ALTER COLUMN "hasVulnerabilityAlertsEnabled" DROP DEFAULT;
