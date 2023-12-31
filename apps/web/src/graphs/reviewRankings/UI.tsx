'use client'
import 'client-only'

import { FC } from 'react'
import { Avatar, Box, Heading, HStack, List, ListItem } from '@chakra-ui/react'

type Props = {
  reviewRankings: {
    login: string
    avatarUrl: string
    count: number
  }[]
}

export const UI: FC<Props> = ({ reviewRankings }) => (
  <Box
    backgroundColor="white"
    rounded="lg"
    p={4}
    shadow="xl"
    width="100%"
    h="100%"
  >
    <Heading as="h3" fontSize="xl">
      レビュー数
    </Heading>

    <List p={4}>
      {reviewRankings
        .sort((a, b) => b.count - a.count)
        .slice(0, 5)
        .map((item) => (
          <ListItem key={item.login}>
            <HStack mb={5} justifyContent="space-between">
              <HStack spacing={6}>
                <Avatar name="avatar" size="sm" src={item.avatarUrl} />
                <Box>{item.login}</Box>
              </HStack>
              <Box>{item.count}</Box>
            </HStack>
          </ListItem>
        ))}
    </List>
  </Box>
)
