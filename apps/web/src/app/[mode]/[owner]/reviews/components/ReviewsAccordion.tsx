'use client'
import 'client-only'

import { FC, useState } from 'react'
import { UserWithReviews } from './Table'
import { Box, List, Button, Collapse } from '@chakra-ui/react'
import { ListItemCustom } from '@/app/[mode]/[owner]/reviews/components/ListItemCustom'

type Props = {
  reviews: UserWithReviews['Reviews']
}

export const ReviewsAccordion: FC<Props> = ({ reviews }) => {
  const [hidePrs, setHidePrs] = useState(true)
  const sortedReviews = reviews.sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
  )

  return (
    <List>
      {sortedReviews.slice(0, 3).map((review) => (
        <ListItemCustom review={review} key={review.url} />
      ))}
      {reviews.length > 3 && (
        <Collapse in={!hidePrs}>
          {sortedReviews.slice(3).map((review) => (
            <ListItemCustom review={review} key={review.url} />
          ))}
        </Collapse>
      )}
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
