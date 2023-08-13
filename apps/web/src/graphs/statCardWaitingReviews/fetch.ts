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
      Prs: {
        where: {
          // TODO: レビューを出した側で絞るのか、出された側で絞るのか検討
          user: {
            login: {
              in: userIds.length ? userIds : undefined,
            },
            // id: {
            //   not: 'BOT_kgDOAbying', // renovate id
            // },
          },
          merged: false,
          closed: false,
        },
        select: {
          id: true,
          authorId: true,
          Reviews: {
            select: {
              id: true,
              authorId: true,
              createdAt: true,
              user: {
                select: {
                  id: true,
                },
              },
            },
          },
        },
      },
    },
  })

  return {
    waitingCount: organization.Prs
      // セルフレビューは除外しつつ、他人からのレビューがついていないもの
      .filter((pr) =>
        pr.Reviews.filter((review) => review.user.id !== pr.authorId),
      ).length,
  }
}
