import 'server-only'

import { FC } from 'react'
import { UI } from './UI'
import { fetch } from './fetch'
import { GraphArgs } from '@/graphs'

const Container: FC<GraphArgs> = async ({ orgId, userIds, startDate }) => {
  const { vulnCount } = await fetch(orgId, userIds, startDate)

  return <UI vulnCount={vulnCount} />
}

export default Container
