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
