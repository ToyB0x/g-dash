'use client'
import 'client-only'

import { Center } from '@chakra-ui/react'
import { Modes } from '@g-dash/types'

export default function Page({
  params,
}: {
  params: { mode: (typeof Modes)[keyof typeof Modes]; owner: string }
}) {
  return (
    <Center h="100vh">
      {params.mode} / {params.owner}
    </Center>
  )
}
