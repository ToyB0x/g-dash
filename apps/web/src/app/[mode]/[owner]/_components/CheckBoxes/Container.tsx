import 'server-only'
import { getSingleTenantPrismaClient } from '@/clients'
import { UserFilterModalButton } from './UserFilterModalButton'
import { FC } from 'react'

type Props = {
  orgId: string
}

const Container: FC<Props> = async ({ orgId }) => {
  const prisma = getSingleTenantPrismaClient()
  const result = await prisma.organization.findUniqueOrThrow({
    where: {
      login: orgId,
    },
    select: {
      id: true,
      Users: {
        where: {
          id: {
            not: 'BOT_kgDOAbying', // renovate id
          },
        },
        select: {
          id: true,
          login: true,
          avatarUrl: true,
        },
      },
    },
  })

  return <UserFilterModalButton users={result.Users} />
}

export default Container
