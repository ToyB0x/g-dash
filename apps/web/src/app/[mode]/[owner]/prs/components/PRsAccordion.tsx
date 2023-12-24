'use client'
import 'client-only'

import { FC, useState } from 'react'
import { UserWithPRs } from './Table'
import { Box, HStack, List, ListItem, Link, Button } from '@chakra-ui/react'

type Props = {
  prs: UserWithPRs['Prs']
}

export const PRsAccordion: FC<Props> = ({ prs }) => {
  const [hidePrs, setHidePrs] = useState(true)

  const filteredPrs = prs.filter((pr) => pr.merged && !!pr.mergedAt)

  return (
    <List>
      {filteredPrs
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        .slice(0, hidePrs ? 3 : prs.length)
        .map((pr) => (
          <ListItem key={pr.url}>
            <HStack justify="space-between">
              <Box w="32rem" isTruncated>
                <Link href={pr.url} isExternal>
                  {pr.title}
                </Link>
              </Box>
              <Box>
                {/*+{pr.additions} / -{pr.deletions} lines*/}
                {pr.changedFiles} files
              </Box>
            </HStack>
          </ListItem>
        ))}
      {filteredPrs.length > 3 && (
        <Box textAlign="right">
          <Button
            textColor="black"
            colorScheme="transparent"
            size="xs"
            px={0}
            alignSelf={'right'}
            onClick={() => setHidePrs(!hidePrs)}
          >
            {hidePrs ? filteredPrs.length - 3 + ' more..' : 'less..'}
          </Button>
        </Box>
      )}
    </List>
  )
}
