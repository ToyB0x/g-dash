'use client'
import 'client-only'

import { Box, Flex } from '@chakra-ui/react'
import { Sidebar } from '@g-dash/ui'
import { Modes } from '@g-dash/types'

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { mode: (typeof Modes)[keyof typeof Modes]; owner: string }
}) {
  return (
    <Flex>
      <Sidebar mode={params.mode} owner={params.owner} />
      <Box minH="100vh" flexGrow={1} bg="gray.50">
        {children}
      </Box>
    </Flex>
  )
}
