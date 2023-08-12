import { getSingleTenantPrismaClient } from '@/clients'

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
