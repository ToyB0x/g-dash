import 'server-only'

import { use } from 'react'
import { Modes } from '@g-dash/types'
import { Spans } from '@g-dash/utils'
import { HeatMap } from './components'
import { getSingleTenantPrismaClient } from '@/clients'

export default function Page({
  params,
  searchParams,
}: {
  params: {
    mode: (typeof Modes)[keyof typeof Modes]
    owner: string
  }
  searchParams: {
    login?: string
  }
}) {
  // NOTE: URLパラメータクエリが変わると以下が再実行されます
  // ref: https://github.com/vercel/next.js/discussions/48110
  const loginParams = searchParams.login
  const logins = loginParams ? decodeURI(loginParams).split(',') : []

  const prisma = getSingleTenantPrismaClient()
  const organization = use(
    prisma.organization.findUniqueOrThrow({
      where: {
        login: params.owner,
      },
      select: {
        id: true,
        Prs: {
          where: {
            createdAt: {
              gte: new Date(Spans['1 month']),
            },
            user: {
              login: {
                in: logins.length ? logins : undefined,
              },
            },
          },
          select: {
            id: true,
            createdAt: true,
          },
        },
        Reviews: {
          where: {
            authorId: {
              not: 'BOT_kgDOAbying', // renovate id
            },
            user: {
              login: {
                in: logins.length ? logins : undefined,
              },
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
            user: {
              login: {
                in: logins.length ? logins : undefined,
              },
            },
          },
          select: {
            id: true,
            committedDate: true,
          },
        },
      },
    }),
  )

  return (
    <HeatMap
      committedDates={organization.Commits.map(
        (commit) => commit.committedDate,
      )}
      reviewedDates={organization.Reviews.map((review) => review.createdAt)}
    />
  )
}
