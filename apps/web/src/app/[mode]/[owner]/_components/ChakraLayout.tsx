'use client'
import 'client-only'

import { Box, Flex } from '@chakra-ui/react'
import { FC, ReactNode } from 'react'

type Props = {
  Sidebar: ReactNode
  Content: ReactNode
}

export const ChakraLayout: FC<Props> = ({ Sidebar, Content }) => (
  <Flex>
    {Sidebar}
    <Box minH="100vh" w="full" bg="gray.50">
      {Content}
    </Box>
  </Flex>
)
