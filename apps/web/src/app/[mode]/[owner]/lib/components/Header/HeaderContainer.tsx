'use client'
import 'client-only'

import { FC } from 'react'
import { UserFilterModal } from './CheckBoxes'

type Props = {
  users: {
    id: string
    login: string
    avatarUrl: string
  }[]
}

export const HeaderContainer: FC<Props> = ({ users }) => (
  <UserFilterModal users={users} />
)
