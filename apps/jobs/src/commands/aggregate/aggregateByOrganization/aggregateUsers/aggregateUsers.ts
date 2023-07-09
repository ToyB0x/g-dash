import { GraphQLClient } from 'graphql-request'
import { sleep } from '@g-dash/utils'
import { paginate } from './paginate'
import { getFirstPage } from './getFirstPage'
import { getEnv, getSingleTenantPrismaClient } from '../../../../utils'
import { maxOld } from '../aggregateByOrganization'

export const aggregateUsers = async (
  orgName: string,
  organizationId: string,
): Promise<void> => {
  const prismaSingleTenantClient = getSingleTenantPrismaClient()

  const githubClient = new GraphQLClient('https://api.github.com/graphql', {
    headers: {
      Authorization:
        'Bearer ' + getEnv().APPS_JOBS_GITHUB_PERSONAL_ACCESS_TOKEN,
      'X-Github-Next-Global-ID': '1',
    },
  })

  const users: {
    id: string
    login: string
    avatarUrl: string
    name: string | null | undefined
  }[] = []

  try {
    // get first page
    let {
      users: firstPageResult,
      hasNextPage,
      cursor,
    } = await getFirstPage(githubClient, orgName)

    users.push(...firstPageResult)

    // get paginated results
    while (hasNextPage && cursor) {
      await sleep(500)
      const {
        users: _users,
        hasNextPage: _hasNextPage,
        cursor: _cursor,
      } = await paginate(githubClient, orgName, cursor)

      users.push(..._users)
      hasNextPage = _hasNextPage
      cursor = _cursor
    }

    // upsert repositories (because repository name can be changed)
    await Promise.all(
      users.map(async (user) => {
        await prismaSingleTenantClient.user.upsert({
          where: {
            id: user.id,
          },
          create: {
            id: user.id,
            login: user.login,
            avatarUrl: user.avatarUrl,
            name: user.name || null,
            organizationId,
          },
          update: {
            login: user.login,
            avatarUrl: user.avatarUrl,
            name: user.name || null,
            organizationId,
          },
        })
      }),
    )
  } catch (err) {
    throw err
  } finally {
    await prismaSingleTenantClient.$disconnect()
  }
}
