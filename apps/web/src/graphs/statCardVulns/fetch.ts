import { getSingleTenantPrismaClient } from '@/clients'

export const fetch = async (
  orgId: string,
  userIds: string[],
  startDate: Date,
) => {
  const prisma = getSingleTenantPrismaClient()
  const organization = await prisma.organization.findUniqueOrThrow({
    where: {
      login: orgId,
    },
    select: {
      id: true,
      Repositories: {
        select: {
          vulnerabilityAlertsTotalCount: true,
        },
      },
    },
  })

  return {
    vulnCount: organization.Repositories.reduce(
      (acc, cur) => acc + cur.vulnerabilityAlertsTotalCount,
      0,
    ),
  }
}
