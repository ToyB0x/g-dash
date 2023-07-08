'use client'
import 'client-only'

import { FC } from 'react'
import { Box } from '@chakra-ui/react'
import { Link } from '@chakra-ui/next-js'
import { Modes } from '@g-dash/types'

type LinkItem = {
  name: string
  href: string
}

const linkItems: LinkItem[] = [
  { name: 'PRs', href: 'prs' },
  { name: 'Reviews', href: 'reviews' },
  { name: 'Comments', href: 'comments' },
]

type Props = {
  mode: (typeof Modes)[keyof typeof Modes]
  owner: string
}

export const Sidebar: FC<Props> = ({ mode, owner }) => {
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
          href={`/${mode}/${owner}/${link.href}`}
        >
          {link.name}
        </Link>
      ))}
    </Box>
  )
}
