'use client'
import 'client-only'

import { FC, useState } from 'react'
import { UserWithReviews } from './Table'
import { Box, HStack, List, ListItem, Link, Button } from '@chakra-ui/react'

type Props = {
  reviews: UserWithReviews['Reviews']
}

export const ReviewsAccordion: FC<Props> = ({ reviews }) => {
  const [hidePrs, setHidePrs] = useState(true)

  return (
    <List>
      {reviews
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        .slice(0, hidePrs ? 3 : reviews.length)
        .map((review) => (
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
        ))}
      {reviews.length > 3 && (
        <Box textAlign="right">
          <Button
            textColor="black"
            colorScheme="transparent"
            size="xs"
            px={0}
            alignSelf={'right'}
            onClick={() => setHidePrs(!hidePrs)}
          >
            {hidePrs ? reviews.length - 3 + ' more..' : 'less..'}
          </Button>
        </Box>
      )}
    </List>
  )
}
