import 'server-only'

import { Modes } from '@g-dash/types'
import { Container } from './Container'
import { getSingleTenantPrismaClient } from '@/clients'
import { use } from 'react'
import { Spans } from '@g-dash/utils'

export default function Page({
  params,
}: {
  params: { mode: (typeof Modes)[keyof typeof Modes]; owner: string }
}) {
  const prisma = getSingleTenantPrismaClient()
  const organization = use(
    prisma.organization.findUniqueOrThrow({
      where: {
        login: params.owner,
      },
      select: {
        id: true,
        Users: {
          select: {
            id: true,
            Reviews: {
              select: {
                id: true,
              },
              where: {
                createdAt: {
                  gte: new Date(Spans['1 month']),
                },
              },
            },
          },
        },
        Releases: {
          select: {
            id: true,
          },
          where: {
            publishedAt: {
              gte: new Date(Spans['1 month']),
            },
          },
        },
        Prs: {
          select: {
            id: true,
            merged: true,
            closed: true,
            mergedAt: true,
            Reviews: {
              select: {
                id: true,
                authorId: true,
                createdAt: true,
              },
            },
          },
          where: {
            mergedAt: {
              gte: new Date(Spans['1 month']),
            },
          },
        },
        Repositories: {
          select: {
            vulnerabilityAlertsTotalCount: true,
          },
        },
      },
    }),
  )

  return (
    <Container
      releaseCount={organization.Releases.length}
      mergedCount={
        organization.Prs.filter(
          (pr) => pr.mergedAt && Date.now() > pr.mergedAt.getTime(),
        ).length
      }
      reviewCount={organization.Users.reduce(
        (acc, cur) => acc + cur.Reviews.length,
        0,
      )}
      waitingReviewCount={
        organization.Prs.filter(
          (pr) => !pr.merged && !pr.closed && pr.Reviews.length === 0,
        ).length
      }
      vulnerabilityAlertCount={organization.Repositories.reduce(
        (acc, cur) => acc + cur.vulnerabilityAlertsTotalCount,
        0,
      )}
    />
  )
}
