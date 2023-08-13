'use client'
import 'client-only'

import { FC } from 'react'
import { StatCard } from '@g-dash/ui'
import { GoCommentDiscussion } from 'react-icons/go'

type Props = {
  reviewCount: number
}

export const UI: FC<Props> = ({ reviewCount }) => (
  <StatCard
    title="レビュー数"
    stat={reviewCount + '/month'}
    icon={<GoCommentDiscussion size="3rem" />}
  />
)
