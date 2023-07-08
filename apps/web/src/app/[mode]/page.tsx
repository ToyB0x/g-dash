'use client'
import 'client-only'

import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Button, Center, Input, Select, Stack } from '@chakra-ui/react'

export default function Page() {
  const router = useRouter()
  const pathname = usePathname()
  const [organizationName, setOrganizationName] = useState('')

  return (
    <Center h="100vh">
      <Stack>
        <Input
          w="24rem"
          placeholder="input organizationName"
          onChange={(e) => setOrganizationName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter')
              router.push(pathname + '/' + organizationName)
          }}
        />
        <Button
          w="30%"
          marginLeft="auto"
          onClick={() => router.push(pathname + '/' + organizationName)}
        >
          Submit
        </Button>
      </Stack>
    </Center>
  )
}
