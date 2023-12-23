import { getSingleTenantPrismaClient } from '@/clients'
import { Spans } from '@g-dash/utils'
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
          user: {
            select: {
              login: true,
              avatarUrl: true,
            },
          },
        },
      },
    },
  })

  return {
    prRankings: organization.Prs.map((pr) => ({
      login: pr.user.login,
      avatarUrl: pr.user.avatarUrl,
    })).reduce(
      (acc, cur) => {
        const foundIndex = acc.findIndex((a) => a.login === cur.login)
        if (foundIndex != -1) {
          acc[foundIndex].count += 1
        } else {
          acc.push({
            login: cur.login,
            avatarUrl: cur.avatarUrl,
            count: 1,
          })
        }
        return acc
      },
      [] as {
        login: string
        count: number
        avatarUrl: string
      }[],
    ),
  }
}
