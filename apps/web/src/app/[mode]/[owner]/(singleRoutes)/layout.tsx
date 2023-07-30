import 'server-only'

import { Sidebar } from '@g-dash/ui'
import { Modes } from '@g-dash/types'
import { ChakraLayout } from './_components/ChakraLayout'

export default function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode
  heatmap: React.ReactNode
  params: { mode: (typeof Modes)[keyof typeof Modes]; owner: string }
}) {
  return (
    <>
      <ChakraLayout
        Sidebar={<Sidebar mode={params.mode} owner={params.owner} />}
        Content={children}
      />
    </>
  )
}
