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
          mergedAt: {
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
        },
      },
    },
  })

  return {
    mergedCount: organization.Prs.length,
  }
}
