'use client'
import 'client-only'

import { FC } from 'react'
import { Skeleton as ChakraSkeleton, SkeletonProps } from '@chakra-ui/react'

export const Skeleton: FC<SkeletonProps> = (props) => {
  return <ChakraSkeleton borderRadius={5} {...props} />
}
