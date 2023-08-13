import 'server-only'

import { FC } from 'react'
import { UI } from './UI'
import { fetch } from './fetch'
import { GraphArgs } from '@/graphs'

const Container: FC<GraphArgs> = async ({ orgId, userIds, startDate }) => {
  const { reviewRankings } = await fetch(orgId, userIds, startDate)

  return <UI reviewRankings={reviewRankings} />
}

export default Container
