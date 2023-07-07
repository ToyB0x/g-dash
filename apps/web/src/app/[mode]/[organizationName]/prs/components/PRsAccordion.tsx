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

  return (
    <List>
      {prs
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
      {prs.length > 3 && (
        <Box textAlign="right">
          <Button
            textColor="black"
            colorScheme="transparent"
            size="xs"
            px={0}
            alignSelf={'right'}
            onClick={() => setHidePrs(!hidePrs)}
          >
            {hidePrs ? 'more..' : 'less..'}
          </Button>
        </Box>
      )}
    </List>
  )
}
