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
    closedAt: Date
    mergedAt: Date
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
    accessorFn: (props) =>
      Math.round(
        props.Prs.reduce(
          (a, b) =>
            b.mergedAt ? a + (b.mergedAt.getTime() - b.createdAt.getTime()) : 0,
          0,
        ) /
          props.Prs.filter((pr) => pr.merged).length /
          (1000 * 60 * 60),
      ),
    meta: {
      isNumeric: true,
    },
  },
  columnHelper.display({
    header: '詳細',
    cell: (props) => <PRsAccordion prs={props.row.original.Prs} />,
  }),
]

export const Table: FC<Props> = ({ usersWithPRs }) => (
  <DataTable columns={columns} data={usersWithPRs} />
)
