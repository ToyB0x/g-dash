import 'server-only'

import { FC } from 'react'
import { UI } from './UI'
import { fetch } from './fetch'
import { GraphArgs } from '@/graphs'

const Container: FC<GraphArgs> = async ({ orgId, userIds, startDate }) => {
  const { committedDates, reviewedDates } = await fetch(
    orgId,
    userIds,
    startDate,
  )

  return <UI committedDates={committedDates} reviewedDates={reviewedDates} />
}

export default Container
