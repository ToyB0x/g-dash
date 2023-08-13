'use client'
import 'client-only'

import { FC } from 'react'
import { IoIosGitPullRequest } from 'react-icons/io'
import { StatCard } from '@g-dash/ui'

type Props = {
  mergedCount: number
}

export const UI: FC<Props> = ({ mergedCount }) => (
  <StatCard
    title="マージ済みPR"
    stat={mergedCount + '/month'}
    icon={<IoIosGitPullRequest size="3rem" />}
  />
)
