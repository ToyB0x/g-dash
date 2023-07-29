'use client'
import 'client-only'

import { Flex, Stack } from '@chakra-ui/react'
import { FC, ReactNode } from 'react'

type Props = {
  Sidebar: ReactNode
  Contents: ReactNode[]
}

export const ChakraLayout: FC<Props> = ({ Sidebar, Contents }) => (
  <Flex>
    {Sidebar}
    <Stack minH="100vh" bg="gray.50" py={4} px={8} spacing={8}>
      {Contents.map((Content) => (
        <>{Content}</>
      ))}
    </Stack>
  </Flex>
)
