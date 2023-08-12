import 'server-only'

import { Modes } from '@g-dash/types'
import { Spans } from '@g-dash/utils'
import ActivityMap from '@/graphs/activityMap'

export default async function Page({
  params,
  searchParams,
}: {
  params: {
    mode: (typeof Modes)[keyof typeof Modes]
    owner: string
  }
  searchParams: {
    login?: string
  }
}) {
  // NOTE: URLパラメータクエリが変わると以下が再実行されます
  // ref: https://github.com/vercel/next.js/discussions/48110
  const loginParams = searchParams.login
  const logins = loginParams ? decodeURI(loginParams).split(',') : []

  return (
    <ActivityMap
      orgId={params.owner}
      userIds={logins}
      startDate={new Date(Spans['1 month'])}
    />
  )
}
