'use client'
import 'client-only'

import { FC, useState } from 'react'
import { DataTable } from '@g-dash/ui'
import { PRsAccordion } from './PRsAccordion'
import { Avatar, Box, Select, Stack } from '@chakra-ui/react'
import { createColumnHelper } from '@tanstack/react-table'
import { Spans } from '@g-dash/utils'

export type UserWithPRs = {
  id: string
  login: string
  avatarUrl: string
  Prs: {
    id: string
    organizationId: string
    authorId: string
    title: string
    url: string
    additions: number
    deletions: number
    changedFiles: number
    commentsTotalCount: number
    merged: boolean
    closed: boolean
    createdAt: Date
    closedAt: Date | null
    mergedAt: Date | null
    Reviews: {
      id: string
      authorId: string
    }[]
  }[]
}

type Props = {
  usersWithPRs: UserWithPRs[]
}

const columnHelper = createColumnHelper<UserWithPRs>()

const columns = [
  columnHelper.accessor('login', {
    header: 'Id',
    cell: (props) => (
      <Stack alignItems="center" w={28}>
        <Avatar src={props.row.original.avatarUrl} />
        <Box pt={1}> {props.row.original.login}</Box>
      </Stack>
    ),
  }),
  columnHelper.accessor('Prs', {
    header: 'マージ済みPR',
    cell: (props) => props.row.original.Prs.filter((pr) => pr.merged).length,
    meta: {
      isNumeric: true,
    },
  }),
  {
    header: 'リードタイム',
    accessorFn: (props: UserWithPRs) => {
      const mergedPrs = props.Prs.filter(
        (
          pr,
        ): pr is UserWithPRs['Prs'][0] & {
          mergedAt: Date
        } => pr.merged && !!pr.mergedAt,
      )

      return Math.round(
        mergedPrs.reduce(
          (prev, current) =>
            prev + (current.mergedAt.getTime() - current.createdAt.getTime()),
          0,
        ) /
          mergedPrs.length /
          (1000 * 60 * 60),
      )
    },
    meta: {
      isNumeric: true,
    },
  },
  {
    header: '被レビュー数',
    accessorFn: (props: UserWithPRs) => {
      return props.Prs.reduce(
        (acc, cur) =>
          acc + cur.Reviews.filter((r) => cur.authorId !== r.authorId).length,
        0,
      )
    },
    meta: {
      isNumeric: true,
    },
  },
  {
    header: '被レビュー数が3以上のPR数',
    accessorFn: (props: UserWithPRs) => {
      return props.Prs.filter(
        (pr) =>
          pr.Reviews.filter((r) => pr.authorId !== r.authorId).length >= 3,
      ).length
    },
    meta: {
      isNumeric: true,
    },
  },
  {
    header: '被レビュー数が5以上のPR数',
    accessorFn: (props: UserWithPRs) => {
      return props.Prs.filter(
        (pr) =>
          pr.Reviews.filter((r) => pr.authorId !== r.authorId).length >= 5,
      ).length
    },
    meta: {
      isNumeric: true,
    },
  },
  {
    header: '被レビュー数が7以上のPR数',
    accessorFn: (props: UserWithPRs) => {
      return props.Prs.filter(
        (pr) =>
          pr.Reviews.filter((r) => pr.authorId !== r.authorId).length >= 7,
      ).length
    },
    meta: {
      isNumeric: true,
    },
  },
  columnHelper.display({
    header: '詳細',
    cell: (props) => <PRsAccordion prs={props.row.original.Prs} />,
  }),
]

type RequiredNotNull<T> = {
  [P in keyof T]: NonNullable<T[P]>
}
export const Table: FC<Props> = ({ usersWithPRs }) => {
  const [span, setSpan] = useState<number>(Spans['6 month'])

  return (
    <>
      <DataTable
        columns={columns}
        data={usersWithPRs
          .map((u) => ({
            ...u,
            Prs: u.Prs.filter((pr) => pr.createdAt.getTime() > span),
          }))
          .filter((u) => u.Prs.length > 0)}
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
