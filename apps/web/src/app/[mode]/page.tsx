'use client'
import 'client-only'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Center, Input, Stack } from '@chakra-ui/react'
import { Modes } from '@g-dash/types'

export default function Page({
  params,
}: {
  params: { mode: (typeof Modes)[keyof typeof Modes] }
}) {
  const router = useRouter()
  const [ownerName, setOwnerName] = useState('')

  return (
    <Center h="100vh">
      <Stack>
        <Input
          w="24rem"
          placeholder="input organizationName"
          onChange={(e) => setOwnerName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') router.push(params.mode + '/' + ownerName)
          }}
        />
        <Button
          w="30%"
          marginLeft="auto"
          onClick={() => router.push(params.mode + '/' + ownerName)}
        >
          Submit
        </Button>
      </Stack>
    </Center>
  )
}
