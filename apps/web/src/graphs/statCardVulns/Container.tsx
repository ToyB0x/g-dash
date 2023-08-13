import 'server-only'

import { FC } from 'react'
import { UI } from './UI'
import { fetch } from './fetch'
import { GraphArgs } from '@/graphs'

const Container: FC<GraphArgs> = async ({ orgId, userIds, days }) => {
  const { vulnCount } = await fetch(orgId, userIds, days)

  return <UI vulnCount={vulnCount} />
}

export default Container
