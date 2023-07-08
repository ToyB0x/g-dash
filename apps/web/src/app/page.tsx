'use client'
import 'client-only'

import { useRouter } from 'next/navigation'
import { Center, Select } from '@chakra-ui/react'

export default function Page() {
  const router = useRouter()

  return (
    <Center h="100vh">
      <Select
        w="24rem"
        onChange={(e) => {
          router.push(`/${e.target.value}`)
        }}
        placeholder="Select mode"
        variant="filled"
      >
        <option value="personal">personal</option>
        <option value="organization">organization</option>
      </Select>
    </Center>
  )
}
