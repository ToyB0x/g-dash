import { getSingleTenantPrismaClient } from '@/clients'
import { Spans } from '@g-dash/utils'

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
      Reviews: {
        where: {
          createdAt: {
            gte: startDate,
          },
          user: {
            login: {
              in: userIds.length ? userIds : undefined,
            },
          },
        },
        select: {
          id: true,
          createdAt: true,
          user: {
            select: {
              id: true,
              login: true,
              avatarUrl: true,
            },
          },
          pr: {
            select: {
              id: true,
              authorId: true,
            },
          },
        },
      },
    },
  })

  return {
    reviewRankings: organization.Reviews
      // セルフレビューは除外
      .filter((review) => review.user.id !== review.pr.authorId)
      .map((review) => ({
        login: review.user.login,
        avatarUrl: review.user.avatarUrl,
      }))
      .reduce(
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
