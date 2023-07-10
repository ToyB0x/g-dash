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
            title: true,
            merged: true,
            closed: true,
            createdAt: true,
            mergedAt: true,
            user: {
              select: {
                login: true,
                avatarUrl: true,
              },
            },
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
          select: {
            committedDate: true,
            user: {
              select: {
                login: true,
                avatarUrl: true,
              },
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
        organization.Commits.map((commit) => ({
          committedDate: commit.committedDate,
          login: commit.user.login,
        })),
      )}
      pieChartSeries={organization.Prs.filter(
        (pr) =>
          pr.mergedAt &&
          Date.now() > pr.mergedAt.getTime() &&
          pr.mergedAt.getTime() >= new Date(Spans['1 month']).getTime(),
      ).map((pr) => pr.title)}
      prRankings={organization.Prs.filter((pr) => pr.merged)
        .filter(
          (pr) =>
            pr.mergedAt &&
            Date.now() > pr.mergedAt.getTime() &&
            pr.mergedAt.getTime() >= new Date(Spans['1 month']).getTime(),
        )
        .map((pr) => ({
          login: pr.user.login,
          avatarUrl: pr.user.avatarUrl,
        }))
        .reduce(
          (acc, cur) => {
            const foundIndex = acc.findIndex((a) => a.login === cur.login)
            if (foundIndex != -1) {
              acc[foundIndex].prCount += 1
            } else {
              acc.push({
                login: cur.login,
                avatarUrl: cur.avatarUrl,
                prCount: 1,
              })
            }
            return acc
          },
          [] as {
            login: string
            prCount: number
            avatarUrl: string
          }[],
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
  commits: { committedDate: Date; login: string }[],
): {
  [login: string]: {
    [dateString: string]: number
  }
} => {
  const obj: {
    [login: string]: {
      [dateString: string]: number
    }
  } = {}

  const users = Array.from(new Set(commits.map((commit) => commit.login)))

  // init obj
  const dateStrings = Array.from(Array(365).keys()).map((i) => {
    const date = new Date()
    date.setDate(date.getDate() - i)
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    ).toDateString()
  })

  users.forEach((user) => {
    obj[user] = {}
    dateStrings.forEach((dateString) => {
      obj[user][dateString] = 0
    })
  })

  const updateCount = (login: string, committedDate: Date) => {
    const dateString = new Date(
      committedDate.getFullYear(),
      committedDate.getMonth(),
      committedDate.getDate(),
    ).toDateString()

    if (obj[login][dateString]) {
      obj[login][dateString]++
    } else {
      obj[login][dateString] = 1
    }
  }

  commits.forEach((commit) => updateCount(commit.login, commit.committedDate))

  return obj
}
