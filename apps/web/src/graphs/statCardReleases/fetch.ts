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
      Releases: {
        select: {
          id: true,
        },
        where: {
          publishedAt: {
            gte: startDate,
          },
        },
      },
    },
  })

  return {
    releaseCount: organization.Releases.length,
  }
}
