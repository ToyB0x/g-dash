'use client'
import 'client-only'

import { FC } from 'react'
import { StatCard } from '@g-dash/ui'
import { GiBiohazard } from 'react-icons/gi'

type Props = {
  vulnCount: number
}

export const UI: FC<Props> = ({ vulnCount }) => (
  <StatCard
    title="脆弱なパッケージ"
    stat={vulnCount.toString()}
    icon={<GiBiohazard size="3rem" />}
  />
)
