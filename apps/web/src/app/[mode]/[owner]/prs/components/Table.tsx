'use client'
import 'client-only'

import { FC } from 'react'
import { DataTable } from '@g-dash/ui'
import { PRsAccordion } from './PRsAccordion'
import { Avatar, Box, Stack } from '@chakra-ui/react'
import { createColumnHelper } from '@tanstack/react-table'

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
    commitsTotalCount: number
    merged: boolean
    closed: boolean
    createdAt: Date
    closedAt: Date | null
    mergedAt: Date | null
  }[]
}

type Props = {
  usersWithPRs: UserWithPRs[]
}

const columnHelper = createColumnHelper<UserWithPRs>()

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
  columnHelper.accessor('Prs', {
    header: 'PRs',
    cell: (props) => props.row.original.Prs.length,
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
  columnHelper.display({
    header: '詳細',
    cell: (props) => <PRsAccordion prs={props.row.original.Prs} />,
  }),
]

type RequiredNotNull<T> = {
  [P in keyof T]: NonNullable<T[P]>
}
export const Table: FC<Props> = ({ usersWithPRs }) => (
  <DataTable columns={columns} data={usersWithPRs} />
)
