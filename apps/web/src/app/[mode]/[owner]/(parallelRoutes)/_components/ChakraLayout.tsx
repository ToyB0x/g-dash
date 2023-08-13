'use client'
import 'client-only'

import { Box, Flex, Stack } from '@chakra-ui/react'
import { FC, ReactNode } from 'react'

type Props = {
  Sidebar: ReactNode
  Content: ReactNode
  HeatMap: ReactNode
}

export const ChakraLayout: FC<Props> = ({ Sidebar, Content, HeatMap }) => (
  <Flex>
    {Sidebar}
    <Stack minH="100vh" bg="gray.50" py={4} px={8} spacing={8}>
      {Content}
      <Box h="600px" w="1200px">
        {HeatMap}
      </Box>
    </Stack>
  </Flex>
)
