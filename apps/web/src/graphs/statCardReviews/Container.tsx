import 'server-only'

import { FC } from 'react'
import { UI } from './UI'
import { fetch } from './fetch'
import { GraphArgs } from '@/graphs'

const Container: FC<GraphArgs> = async ({ orgId, userIds, days }) => {
  const { reviewCount } = await fetch(orgId, userIds, days)

  return <UI reviewCount={reviewCount} />
}

export default Container
