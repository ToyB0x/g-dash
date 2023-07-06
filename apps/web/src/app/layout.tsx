'use client'
import 'client-only'

import { Box, Flex } from '@chakra-ui/react'
import { Providers } from './providers'
import { Sidebar } from '@g-dash/ui'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        <Providers>
          <Flex>
            <Sidebar />
            <Box h="120vh">{children}</Box>
          </Flex>
        </Providers>
      </body>
    </html>
  )
}
