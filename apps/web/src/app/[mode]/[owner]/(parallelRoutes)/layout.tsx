'use client'
import 'client-only'

import { Sidebar } from '@g-dash/ui'
import { Modes } from '@g-dash/types'
import { Flex, Stack } from '@chakra-ui/react'

export default function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { mode: (typeof Modes)[keyof typeof Modes]; owner: string }
}) {
  return (
    <Flex>
      <Sidebar mode={params.mode} owner={params.owner} />
      <Stack minH="100vh" bg="gray.50" py={4} px={8} spacing={8}>
        {children}
      </Stack>
    </Flex>
  )
}
