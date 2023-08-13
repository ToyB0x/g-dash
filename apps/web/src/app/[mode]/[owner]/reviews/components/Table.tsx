'use client'
import 'client-only'

import { FC, useState } from 'react'
import { DataTable } from '@g-dash/ui'
import { ReviewsAccordion } from './ReviewsAccordion'
import { Avatar, Box, Select, Stack } from '@chakra-ui/react'
import { createColumnHelper } from '@tanstack/react-table'
import { Spans } from '@g-dash/utils'

export type UserWithReviews = {
  id: string
  login: string
  avatarUrl: string
  Reviews: {
    id: string
    url: string
    createdAt: Date
    pr: {
      title: string
      url: string
      changedFiles: number
      reviewRequests: {
        id: string
        createdAt: Date
        requestedUser: {
          id: string
        }
      }[]
    }
  }[]
}

type Props = {
  userWithReviews: UserWithReviews[]
}

const columnHelper = createColumnHelper<UserWithReviews>()

const columns = [
  columnHelper.display({
    id: 'Avatar',
    cell: (props) => (
      <Stack alignItems="center" w={32}>
        <Avatar src={props.row.original.avatarUrl} />
        <Box pt={1}> {props.row.original.login}</Box>
      </Stack>
    ),
  }),
  columnHelper.accessor('Reviews', {
    header: 'レビューの投稿数',
    cell: (props) => props.row.original.Reviews.length,
    meta: {
      isNumeric: true,
    },
  }),
  {
    header: 'レビューしたPR数',
    accessorFn: (props: UserWithReviews) =>
      new Set(Array.from(props.Reviews.map((r) => r.pr.url))).size,
    meta: {
      isNumeric: true,
    },
  },
  {
    header: 'レビューまでの平均リードタイム(hour)',
    accessorFn: (props: UserWithReviews) =>
      Math.floor(
        // 該当ユーザに対してレビューリクエストされたものでフィルタ
        props.Reviews.filter((r) =>
          r.pr.reviewRequests
            .map((rr) => rr.requestedUser.id)
            .includes(props.id),
        ).reduce((acc, cur) => {
          const reviewRequestedDates = cur.pr.reviewRequests
            .filter((rr) => rr.requestedUser.id === props.id)
            .map((rr) => rr.createdAt)
            .filter((d) => d.getUTCHours() < 9) // jst 18時以降のレビューリクエストは除外
          // .filter((d) => d.getDay() < 5 && d.getUTCHours() < 8) // 金曜のjst 17時以降のレビューリクエストは除外

          const reviewedDatesIfAnswered = reviewRequestedDates.filter(
            (rrd) => cur.createdAt.getTime() > rrd.getTime(),
          )

          if (reviewedDatesIfAnswered.length === 0) return acc

          const mostRecentReviewedDate = reviewedDatesIfAnswered.sort(
            (a, b) => b.getTime() - a.getTime(),
          )[0]

          const diffHour =
            (cur.createdAt.getTime() - mostRecentReviewedDate.getTime()) /
            (1000 * 60 * 60)
          return acc + diffHour
        }, 0) / props.Reviews.length,
      ) || 0,
    meta: {
      isNumeric: true,
    },
  },
  columnHelper.display({
    header: '詳細',
    cell: (props) => <ReviewsAccordion reviews={props.row.original.Reviews} />,
  }),
]

type RequiredNotNull<T> = {
  [P in keyof T]: NonNullable<T[P]>
}
export const Table: FC<Props> = ({ userWithReviews }) => {
  const [span, setSpan] = useState<number>(Spans['6 month'])

  return (
    <>
      <DataTable
        columns={columns}
        data={userWithReviews.map((u) => ({
          ...u,
          Reviews: u.Reviews.filter(
            (review) => review.createdAt.getTime() > span,
          ),
        }))}
      />
      <Select
        position="fixed"
        top={1}
        right={1}
        size="sm"
        w="14rem"
        onChange={(e) => {
          setSpan(Number(e.target.value))
        }}
        variant="white"
        fontWeight="bold"
        value={span}
      >
        {Object.entries(Spans).map(([k, v]) => (
          <option value={v} key={v}>
            {k}
          </option>
        ))}
      </Select>
    </>
  )
}
