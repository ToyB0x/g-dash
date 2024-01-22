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

  // A. マージまでの時間を計算(階級値): 難易度 低
  const countsByRange = {
    '~1時間': 0,
    '3時間': 0,
    '5時間': 0,
    '10時間': 0,
    '15時間': 0,
    '24時間': 0,
    '36時間': 0,
    '48時間': 0,
    '72時間': 0,
    '96時間': 0,
    '120時間': 0,
    '120時間~': 0,
  }

  organization.Prs.forEach((pr) => {
    if (!pr.mergedAt) return
    const mergeLeadTimeHour = Math.floor(
      (pr.mergedAt.getTime() - pr.createdAt.getTime()) / (1000 * 60 * 60),
    )
    if (mergeLeadTimeHour < 1) return (countsByRange['~1時間'] += 1)
    if (mergeLeadTimeHour < 3) return (countsByRange['3時間'] += 1)
    if (mergeLeadTimeHour < 5) return (countsByRange['5時間'] += 1)
    if (mergeLeadTimeHour < 10) return (countsByRange['10時間'] += 1)
    if (mergeLeadTimeHour < 15) return (countsByRange['15時間'] += 1)
    if (mergeLeadTimeHour < 24) return (countsByRange['24時間'] += 1)
    if (mergeLeadTimeHour < 36) return (countsByRange['36時間'] += 1)
    if (mergeLeadTimeHour < 48) return (countsByRange['48時間'] += 1)
    if (mergeLeadTimeHour < 72) return (countsByRange['72時間'] += 1)
    if (mergeLeadTimeHour < 96) return (countsByRange['96時間'] += 1)
    if (mergeLeadTimeHour < 120) return (countsByRange['120時間'] += 1)
    return (countsByRange['120時間~'] += 1)
  })

  return {
    barChartSeries: countsByRange,
  }
}
