import 'server-only'

import { FC, Suspense } from 'react'
import { Skeleton } from '@g-dash/ui'
import Container from './Container'
import { GraphArgs } from '@/graphs'

const ContainerWithSuspense: FC<GraphArgs> = ({
  orgId,
  userIds,
  startDate,
}) => (
  <Suspense fallback={<Skeleton h="100%" />}>
    <Container orgId={orgId} userIds={userIds} startDate={startDate} />
  </Suspense>
)

export default ContainerWithSuspense
