import 'server-only'

import { FC } from 'react'
import { UI } from './UI'
import { fetch } from './fetch'
import { GraphArgs } from '@/graphs'

const Container: FC<GraphArgs> = async ({ orgId, userIds, days }) => {
  const { committedDates, reviewedDates } = await fetch(orgId, userIds, days)

  return (
    <UI
      committedDates={committedDates}
      reviewedDates={reviewedDates}
      days={days}
    />
  )
}

export default Container
