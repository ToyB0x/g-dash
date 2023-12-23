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
      Reviews: {
        where: {
          authorId: {
            not: 'BOT_kgDOAbying', // renovate id
          },
          createdAt: {
            gte: subDays(new Date(), days),
          },
          user: {
            login: {
              in: userIds.length ? userIds : undefined,
            },
          },
        },
        select: {
          createdAt: true,
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
    barChartSeries: organization.Reviews.map((r) => ({
      login: r.user.login,
      createdAt: r.createdAt,
    })),
  }
}
