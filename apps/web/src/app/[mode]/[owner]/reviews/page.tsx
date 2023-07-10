import 'server-only'

import { use } from 'react'
import { Table, UserWithReviews } from './components'
import { getSingleTenantPrismaClient } from '@/clients'
import { Spans } from '@g-dash/utils'

export default function Page({ params }: { params: { owner: string } }) {
  const prisma = getSingleTenantPrismaClient()
  const organization = use(
    prisma.organization.findUniqueOrThrow({
      where: {
        login: params.owner,
      },
      select: {
        id: true,
      },
    }),
  )

  const usersWithPRs = use(
    prisma.user.findMany({
      select: {
        id: true,
        login: true,
        avatarUrl: true,
        Reviews: {
          where: {
            organizationId: organization.id,
            createdAt: {
              gte: new Date(Spans['6 month']),
            },
          },
          select: {
            id: true,
            url: true,
            createdAt: true,
            pr: {
              select: {
                title: true,
                url: true,
                changedFiles: true,
              },
            },
          },
        },
      },
    }),
  )

  return (
    <Table
      userWithReviews={usersWithPRs.filter((user) => user.Reviews.length > 0)}
    />
  )
}
