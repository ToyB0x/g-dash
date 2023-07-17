'use client'
import 'client-only'

import { FC } from 'react'
import { CheckBox } from './CheckBox'
import { useCheckBoxes } from './useCheckBoxes'
import { Stack } from '@chakra-ui/react'

type Props = {
  users: {
    id: string
    login: string
    avatarUrl: string
  }[]
}

export const CheckBoxes: FC<Props> = ({ users }) => {
  const { onClick, getCheckedLoginSet } = useCheckBoxes()

  return (
    <Stack p={4} spacing={4}>
      {users
        .sort((a, b) =>
          a.login.toLowerCase() > b.login.toLowerCase() ? 1 : -1,
        )
        .map((user, i) => (
          <CheckBox
            key={user.id}
            login={user.login}
            avatarUrl={user.avatarUrl}
            isChecked={getCheckedLoginSet().has(user.login)}
            onClick={onClick}
          />
        ))}
    </Stack>
  )
}
