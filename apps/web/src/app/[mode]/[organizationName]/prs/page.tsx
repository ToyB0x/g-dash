import 'server-only'

import { use } from 'react'
import { Table } from './components'
import { getSingleTenantPrismaClient } from '@/clients'

export default function Page({
  params,
}: {
  params: { organizationName: string }
}) {
  const prisma = getSingleTenantPrismaClient()
  const organization = use(
    prisma.organization.findUniqueOrThrow({
      where: {
        login: params.organizationName,
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
          where: { organizationId: organization.id },
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
          },
        },
      },
    }),
  )

  return <Table usersWithPRs={usersWithPRs} />
}
