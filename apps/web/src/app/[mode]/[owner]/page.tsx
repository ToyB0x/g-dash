import 'server-only'

import { Modes } from '@g-dash/types'
import { Container } from './_components/Container'

export default function Page({
  params,
  searchParams,
}: {
  params: {
    mode: (typeof Modes)[keyof typeof Modes]
    owner: string
  }
  searchParams: {
    login?: string
    days?: string
  }
}) {
  // NOTE: URLパラメータクエリが変わると以下が再実行されます
  // ref: https://github.com/vercel/next.js/discussions/48110
  const loginParams = searchParams.login
  const logins = loginParams ? decodeURI(loginParams).split(',') : []
  const daysParams = searchParams.days
  const days = daysParams ? Number(decodeURI(daysParams)) : 31

  return (
    <Container
      graphArgs={{
        orgId: params.owner,
        userIds: logins,
        days: days,
      }}
    />
  )
}
