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
          createdAt: {
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
          id: true,
          createdAt: true,
        },
      },
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
          id: true,
          committedDate: true,
        },
      },
    },
  })

  return {
    committedDates: organization.Commits.map((commit) => commit.committedDate),
    reviewedDates: organization.Reviews.map((review) => review.createdAt),
  }
}
