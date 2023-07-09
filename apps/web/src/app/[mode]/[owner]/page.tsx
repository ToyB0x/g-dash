import 'server-only'

import { Modes } from '@g-dash/types'
import { Container } from './Container'

export default function Page({
  params,
}: {
  params: { mode: (typeof Modes)[keyof typeof Modes]; owner: string }
}) {
  return <Container />
}
