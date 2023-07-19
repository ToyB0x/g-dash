'use client'
import 'client-only'

import { FC } from 'react'
import { UserFilterModal } from './CheckBoxes'
import { HStack } from '@chakra-ui/react'

type Props = {
  users: {
    id: string
    login: string
    avatarUrl: string
  }[]
}

export const Header: FC<Props> = ({ users }) => (
  <HStack>
    <UserFilterModal users={users} />
  </HStack>
)
