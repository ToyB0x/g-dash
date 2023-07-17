'use client'
import 'client-only'

import { FC, useState } from 'react'
import { Avatar, Box, Checkbox, HStack, Stack } from '@chakra-ui/react'

type Props = {
  users: {
    id: string
    login: string
    avatarUrl: string
  }[]
}

export const CheckBoxes: FC<Props> = ({ users }) => {
  const [checkedItems, setCheckedItems] = useState(
    new Array(users.length).fill(false),
  )

  const allChecked = checkedItems.every(Boolean)
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked

  const onClick = (isChecked: boolean, index: number) => {
    const newCheckedItems = [...checkedItems]
    newCheckedItems[index] = isChecked
    setCheckedItems(newCheckedItems)
  }

  return (
    <Stack p={4} spacing={4}>
      {users
        .sort((a, b) =>
          a.login.toLowerCase() > b.login.toLowerCase() ? 1 : -1,
        )
        .map((user, i) => (
          <Checkbox
            key={user.id}
            isChecked={checkedItems[i]}
            onChange={(e) => onClick(e.target.checked, i)}
          >
            <HStack pl={2} spacing={4}>
              <Avatar src={user.avatarUrl} size="sm" />
              <Box pt={1}> {user.login}</Box>
            </HStack>
          </Checkbox>
        ))}
    </Stack>
  )
}
