'use client'
import 'client-only'

import { FC } from 'react'
import { StatCard } from '@g-dash/ui'
import { GiSandsOfTime } from 'react-icons/gi'
import { BsStar } from 'react-icons/bs'

type Props = {
  releaseCount: number
}

export const UI: FC<Props> = ({ releaseCount }) => (
  <StatCard
    title="リリース数"
    stat={releaseCount + '/month'}
    icon={<BsStar size="3rem" />}
  />
)
