'use client'
import 'client-only'

import { Center } from '@chakra-ui/react'

export default function Page({
  params,
}: {
  params: { mode: 'personal' | 'organization'; organizationName: string }
}) {
  return (
    <Center h="100vh">
      {params.mode} / {params.organizationName}
    </Center>
  )
}
