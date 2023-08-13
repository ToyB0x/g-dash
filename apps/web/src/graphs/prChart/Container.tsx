import 'server-only'

import { FC } from 'react'
import { UI } from './UI'
import { fetch } from './fetch'
import { GraphArgs } from '@/graphs'

const Container: FC<GraphArgs> = async ({ orgId, userIds, days }) => {
  const { lineChartSeries } = await fetch(orgId, userIds, days)

  return <UI lineChartSeries={lineChartSeries} />
}

export default Container
