import 'server-only'

import { FC } from 'react'
import { UI } from './UI'
import { fetch } from './fetch'
import { GraphArgs } from '@/graphs'

const Container: FC<GraphArgs> = async ({ orgId, userIds, days }) => {
  const { barChartSeries } = await fetch(orgId, userIds, days)

  return <UI barChartSeries={barChartSeries} days={days} />
}

export default Container
