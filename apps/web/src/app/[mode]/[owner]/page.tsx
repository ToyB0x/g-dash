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
          where: {
            id: {
              not: 'BOT_kgDOAbying', // renovate id
            },
          },
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
          // TODO: 以下の条件追加を検討
          // where: {
          //   authorId: {
          //     not: 'BOT_kgDOAbying', // renovate id
          //   },
          //   createdAt: {
          //     gte: new Date(Spans['1 month']),
          //   },
          // },
          select: {
            id: true,
            merged: true,
            closed: true,
            createdAt: true,
            mergedAt: true,
            Reviews: {
              select: {
                id: true,
                authorId: true,
                createdAt: true,
              },
            },
          },
        },
        Repositories: {
          select: {
            vulnerabilityAlertsTotalCount: true,
          },
        },
        Reviews: {
          where: {
            authorId: {
              not: 'BOT_kgDOAbying', // renovate id
            },
            createdAt: {
              gte: new Date(Spans['1 month']),
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
              gte: new Date(Spans['1 month']),
            },
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
          (pr) =>
            pr.mergedAt &&
            Date.now() > pr.mergedAt.getTime() &&
            pr.mergedAt.getTime() >= new Date(Spans['1 month']).getTime(),
        ).length
      }
      reviewCount={organization.Users.reduce(
        (acc, cur) => acc + cur.Reviews.length,
        0,
      )}
      // TODO: レビューリクエストを送られたユーザとの比較
      waitingReviewCount={
        organization.Prs.filter(
          (pr) => !pr.merged && !pr.closed && pr.Reviews.length === 0,
        ).length
      }
      vulnerabilityAlertCount={organization.Repositories.reduce(
        (acc, cur) => acc + cur.vulnerabilityAlertsTotalCount,
        0,
      )}
      lineChartSeries={convertToActivityDailyCounts(
        organization.Prs.map((pr) => pr.createdAt),
        organization.Prs.filter((pr) => !!pr.mergedAt).map(
          (pr) => pr.mergedAt!,
        ),
        organization.Reviews.map((pr) => pr.createdAt),
      )}
      barChartSeries={convertToCommitDailyCounts(
        organization.Commits.map((pr) => pr.committedDate),
      )}
    />
  )
}

const convertToActivityDailyCounts = (
  openDates: Date[],
  mergedDates: Date[],
  reviewDates: Date[],
): {
  [dateString: string]: {
    open: number
    merged: number
    review: number
  }
} => {
  const obj: {
    [dateString: string]: {
      open: number
      merged: number
      review: number
    }
  } = {}

  // init obj
  const period = 365
  for (let i = 0; i <= period; i++) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    const dateString = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    ).toDateString()

    obj[dateString] = {
      open: 0,
      merged: 0,
      review: 0,
    }
  }

  const updateCount = (date: Date, type: 'open' | 'merged' | 'review') => {
    const dateString = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    ).toDateString()

    if (obj[dateString]) {
      obj[dateString][type]++
    } else {
      obj[dateString] = {
        open: 0,
        merged: 0,
        review: 0,
      }
      obj[dateString][type]++
    }
  }

  openDates.forEach((date) => updateCount(date, 'open'))
  mergedDates.forEach((date) => updateCount(date, 'merged'))
  reviewDates.forEach((date) => updateCount(date, 'review'))

  return obj
}

const convertToCommitDailyCounts = (
  committedDates: Date[],
): {
  [dateString: string]: number
} => {
  const obj: {
    [dateString: string]: number
  } = {}

  // init obj
  const period = 365
  for (let i = 0; i <= period; i++) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    const dateString = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    ).toDateString()

    obj[dateString] = 0
  }

  const updateCount = (date: Date) => {
    const dateString = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    ).toDateString()

    if (obj[dateString]) {
      obj[dateString]++
    } else {
      obj[dateString] = 0
      obj[dateString]++
    }
  }

  committedDates.forEach((date) => updateCount(date))

  return obj
}
