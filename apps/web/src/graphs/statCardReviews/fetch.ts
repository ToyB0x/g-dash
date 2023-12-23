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
      Users: {
        where: {
          id: {
            not: 'BOT_kgDOAbying', // renovate id
          },
          login: {
            in: userIds.length ? userIds : undefined,
          },
        },
        select: {
          id: true,
          Reviews: {
            select: {
              id: true,
              pr: {
                select: {
                  authorId: true,
                },
              },
            },
            where: {
              createdAt: {
                gte: subDays(new Date(), days),
              },
            },
          },
        },
      },
    },
  })

  return {
    reviewCount: organization.Users
      // セルフレビューは除外
      .reduce((acc, cur) => {
        const reviewsToAnother = cur.Reviews.filter(
          (review) => cur.id !== review.pr.authorId,
        )
        return acc + reviewsToAnother.length
      }, 0),
  }
}
