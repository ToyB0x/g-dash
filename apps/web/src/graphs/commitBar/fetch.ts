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
      Commits: {
        where: {
          committedDate: {
            gte: subDays(new Date(), days),
          },
          user: {
            login: {
              in: userIds.length ? userIds : undefined,
            },
          },
        },
        select: {
          committedDate: true,
          user: {
            select: {
              login: true,
            },
          },
        },
      },
    },
  })

  return {
    barChartSeries: organization.Commits.map((c) => ({
      login: c.user.login,
      committedDate: c.committedDate,
    })),
  }
}
