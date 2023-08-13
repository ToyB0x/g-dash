import { getSingleTenantPrismaClient } from '@/clients'
import { subDays } from 'date-fns'

export const fetch = async (orgId: string, userIds: string[], days: number) => {
  const prisma = getSingleTenantPrismaClient()
  const organization = await prisma.organization.findUniqueOrThrow({
    where: {
      login: orgId,
    },
    select: {
      id: true,
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
        where: {
          user: {
            login: {
              in: userIds.length ? userIds : undefined,
            },
          },
        },
        select: {
          createdAt: true,
          mergedAt: true,
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
            gte: subDays(new Date(), days),
          },
          user: {
            login: {
              in: userIds.length ? userIds : undefined,
            },
          },
        },
        select: {
          createdAt: true,
        },
      },
    },
  })

  return {
    lineChartSeries: convertToActivityDailyCounts(
      organization.Prs.map((pr) => pr.createdAt),
      organization.Prs.filter((pr) => !!pr.mergedAt).map((pr) => pr.mergedAt!),
      organization.Reviews.map((review) => review.createdAt),
    ),
  }
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
