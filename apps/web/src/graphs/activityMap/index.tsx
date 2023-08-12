import 'server-only'

import { FC, Suspense } from 'react'
import { Skeleton } from '@g-dash/ui'
import Container from './Container'

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
