'use client'
import 'client-only'

import { Flex } from '@chakra-ui/react'
import { FC, ReactNode } from 'react'

type Props = {
  Sidebar: ReactNode
  Content: ReactNode
}

export const ChakraLayout: FC<Props> = ({ Sidebar, Content }) => (
  <Flex>
    {Sidebar}
    {Content}
  </Flex>
)
