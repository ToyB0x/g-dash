import 'server-only'

import { use } from 'react'
import { Table } from './components'
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
        Prs: {
          where: {
            organizationId: organization.id,
            createdAt: {
              gte: new Date(Spans['6 month']),
            },
          },
          select: {
            id: true,
            organizationId: true,
            authorId: true,
            title: true,
            url: true,
            additions: true,
            deletions: true,
            changedFiles: true,
            commentsTotalCount: true,
            commitsTotalCount: true,
            merged: true,
            closed: true,
            createdAt: true,
            closedAt: true,
            mergedAt: true,
            Reviews: {
              select: {
                id: true,
                authorId: true,
              },
            },
          },
        },
      },
    }),
  )

  return <Table usersWithPRs={usersWithPRs.filter((u) => u.Prs.length)} />
}
