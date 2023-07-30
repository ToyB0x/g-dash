'use client'
import 'client-only'

import { FC } from 'react'
import { UserWithReviews } from './Table'
import { Box, HStack, Link, ListItem } from '@chakra-ui/react'

type ListItemProps = {
  review: UserWithReviews['Reviews'][0]
}

export const ListItemCustom: FC<ListItemProps> = ({ review }) => (
  <ListItem key={review.url}>
    <HStack justify="space-between">
      <Box w="32rem" isTruncated>
        <Link href={review.url} isExternal>
          {review.pr.title}
        </Link>
      </Box>
      <Box>{review.pr.changedFiles} files</Box>
    </HStack>
  </ListItem>
)
