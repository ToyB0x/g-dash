'use client'
import 'client-only'

import { FC } from 'react'
import { StatCard } from '@g-dash/ui'
import { GiSandsOfTime } from 'react-icons/gi'

type Props = {
  waitingCount: number
}

export const UI: FC<Props> = ({ waitingCount }) => (
  <StatCard
    title="レビュー待ちPR"
    stat={waitingCount.toString()}
    icon={<GiSandsOfTime size="3rem" />}
  />
)
