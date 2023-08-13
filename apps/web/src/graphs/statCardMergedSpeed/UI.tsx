'use client'
import 'client-only'

import { FC } from 'react'
import { StatCard } from '@g-dash/ui'
import { SlSpeedometer } from 'react-icons/sl'

type Props = {
  mergedCount: number
}

export const UI: FC<Props> = ({ mergedCount }) => (
  <StatCard
    title="マージ速度"
    stat={Math.round(mergedCount / (30 - 8)) + '/day'}
    icon={<SlSpeedometer size="3rem" />}
  />
)
