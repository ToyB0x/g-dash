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
            <Box minH="100vh" flexGrow={1} bg="gray.50">
              {children}
            </Box>
          </Flex>
        </Providers>
      </body>
    </html>
  )
}
