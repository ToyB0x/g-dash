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
          merged: true,
          mergedAt: {
            gte: subDays(new Date(), days),
          },
          authorId: {
            not: 'BOT_kgDOAbying', // renovate id
          },
          user: {
            login: {
              in: userIds.length ? userIds : undefined,
            },
          },
        },
        select: {
          createdAt: true,
          mergedAt: true,
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
    barChartSeries: organization.Prs.map((p) => ({
      login: p.user.login,
      mergedAt: p.mergedAt!,
    })),
  }
}
