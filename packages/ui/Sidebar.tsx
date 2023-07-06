'use client'
import 'client-only'

import { Box, Link } from '@chakra-ui/react'

type LinkItem = {
  name: string
  href: string
}

const linkItems: LinkItem[] = [
  { name: 'PRs', href: 'prs' },
  { name: 'Reviews', href: 'reviews' },
  { name: 'Comments', href: 'comments' },
]

export const Sidebar = () => {
  return (
    <Box
      pos="sticky"
      py={2}
      px={4}
      borderRight="1px"
      borderRightColor="gray.200"
    >
      <Link fontSize="4xl" fontWeight="bold" fontFamily="monospace" href="/">
        G-dash
      </Link>

      {linkItems.map((link) => (
        <Link
          ml={1}
          my={2}
          display="block"
          fontSize="lg"
          key={link.name}
          href={`/${link.href}`}
        >
          {link.name}
        </Link>
      ))}
    </Box>
  )
}
