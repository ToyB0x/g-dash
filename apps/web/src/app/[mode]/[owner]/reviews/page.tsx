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
            user: {
              select: {
                id: true,
              },
            },
            pr: {
              select: {
                title: true,
                url: true,
                changedFiles: true,
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
    }),
  )

  return (
    <Table
      userWithReviews={usersWithPRs
        .filter((user) => user.Reviews.length > 0)
        // セルフレビューは除外
        .map((user) => {
          return {
            ...user,
            Reviews: user.Reviews.filter(
              (review) => review.pr.user.id !== review.user.id,
            ),
          }
        })}
    />
  )
}
