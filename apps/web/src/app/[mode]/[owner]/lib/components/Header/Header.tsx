import 'server-only'

import { FC, use } from 'react'
import { getSingleTenantPrismaClient } from '@/clients'
import { HeaderContainer } from './HeaderContainer'

type Props = {
  owner: string
}

export const Header: FC<Props> = ({ owner }) => {
  const prisma = getSingleTenantPrismaClient()
  const result = use(
    prisma.organization.findUniqueOrThrow({
      where: {
        login: owner,
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

  return <HeaderContainer users={result.Users} />
}
