'use client'
import 'client-only'

import { useRouter } from 'next/navigation'
import { Center, Select } from '@chakra-ui/react'
import { Modes } from '@g-dash/types'

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
        {Object.values(Modes).map((mode) => (
          <option value={mode} key={mode}>
            {mode.toUpperCase()}
          </option>
        ))}
      </Select>
    </Center>
  )
}
