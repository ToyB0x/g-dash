import 'server-only'
import { getSingleTenantPrismaClient } from '@/clients'
import { use } from 'react'
import { CheckBoxes } from './components'

export default function Page({ params }: { params: { owner: string } }) {
  const prisma = getSingleTenantPrismaClient()
  const result = use(
    prisma.organization.findUniqueOrThrow({
      where: {
        login: params.owner,
      },
      select: {
        id: true,
        Users: {
          select: {
            id: true,
            login: true,
            avatarUrl: true,
          },
        },
      },
    }),
  )

  return <CheckBoxes users={result.Users} />
}
