'use client'
import 'client-only'

import { FC, useCallback, useEffect, useState } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { Avatar, Box, Checkbox, HStack, Stack } from '@chakra-ui/react'

type Props = {
  users: {
    id: string
    login: string
    avatarUrl: string
  }[]
}

const queryName = 'login'
const separater = ','

export const CheckBoxes: FC<Props> = ({ users }) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // get checkedLoginSet from searchParams
  const getCheckedLoginSet = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString())
    const currentLogins = params.get(queryName)?.split(separater) ?? []
    return new Set(currentLogins)
  }, [searchParams])

  // update searchParams from checkedItems
  const onClick = async (login: string, isChecked: boolean) => {
    const checkedLoginSet = getCheckedLoginSet()
    const params = new URLSearchParams(searchParams.toString())

    if (isChecked) checkedLoginSet.add(login)
    else checkedLoginSet.delete(login)

    if (checkedLoginSet.size >= 1)
      params.set(queryName, Array.from(checkedLoginSet).join(separater))
    else params.delete(queryName)

    router.replace(pathname + '?' + params.toString())
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
            isChecked={getCheckedLoginSet().has(user.login)}
            onChange={(e) => onClick(user.login, e.target.checked)}
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
