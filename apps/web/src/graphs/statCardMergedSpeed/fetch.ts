import { getSingleTenantPrismaClient } from '@/clients'
import { subDays } from 'date-fns/subDays'

export const fetch = async (orgId: string, userIds: string[], days: number) => {
  const prisma = getSingleTenantPrismaClient()
  const organization = await prisma.organization.findUniqueOrThrow({
    where: {
      login: orgId,
    },
    select: {
      id: true,
      Prs: {
        where: {
          mergedAt: {
            gte: subDays(new Date(), days),
          },
          user: {
            login: {
              in: userIds.length ? userIds : undefined,
            },
          },
        },
        select: {
          id: true,
        },
      },
    },
  })

  return {
    mergedCount: organization.Prs.length,
  }
}
