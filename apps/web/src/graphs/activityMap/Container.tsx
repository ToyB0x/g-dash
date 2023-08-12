import 'server-only'

import { FC } from 'react'
import { UI } from './UI'
import { fetch } from './fetch'
import { sleep } from '@g-dash/utils'

export const ActivityMapContainer: FC<GraphArgs> = async ({
  orgId,
  userIds,
  startDate,
}) => {
  await sleep(2000)

  const { committedDates, reviewedDates } = await fetch(
    orgId,
    userIds,
    startDate,
  )

  return <UI committedDates={committedDates} reviewedDates={reviewedDates} />
}
