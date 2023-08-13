import { getSingleTenantPrismaClient } from '@/clients'
import { subDays } from 'date-fns'

export const fetch = async (orgId: string, userIds: string[], days: number) => {
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
            gte: subDays(new Date(), days),
          },
        },
      },
    },
  })

  return {
    releaseCount: organization.Releases.length,
  }
}
