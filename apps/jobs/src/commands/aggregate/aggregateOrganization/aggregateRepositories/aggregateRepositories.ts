import { GraphQLClient } from 'graphql-request'
import { sleep } from '@g-dash/utils'
import { paginate } from './paginate'
import { getFirstPage } from './getFirstPage'
import { getEnv, getSingleTenantPrismaClient } from '../../../../utils'

export const aggregateRepositories = async (orgName: string): Promise<void> => {
  const prismaSingleTenantClient = getSingleTenantPrismaClient()

  const githubClient = new GraphQLClient('https://api.github.com/graphql', {
    headers: {
      Authorization: 'Bearer ' + getEnv().GITHUB_PERSONAL_ACCESS_TOKEN,
      'X-Github-Next-Global-ID': '1',
    },
  })

  const repositories: {
    id: string
    name: string
    pushedAt: string | null
  }[] = []

  try {
    // get first page
    let {
      repositories: firstPageResult,
      organization: { id: organizationId, login },
      hasNextPage,
      cursor,
    } = await getFirstPage(githubClient, orgName)

    repositories.push(...firstPageResult)

    // get paginated results
    while (hasNextPage && cursor) {
      await sleep(500)
      const {
        repositories: _repositories,
        hasNextPage: _hasNextPage,
        cursor: _cursor,
      } = await paginate(githubClient, orgName, cursor)

      repositories.push(...repositories)
      hasNextPage = _hasNextPage
      cursor = _cursor
    }

    // upsert org (because org name can be changed)
    await prismaSingleTenantClient.organization.upsert({
      where: {
        id: organizationId,
      },
      create: {
        id: organizationId,
        login,
      },
      update: {
        login,
      },
    })

    // upsert repositories (because repository name can be changed)
    await Promise.all(
      repositories.map(async (repository) => {
        await prismaSingleTenantClient.repository.upsert({
          where: {
            id: repository.id,
          },
          create: {
            id: repository.id,
            name: repository.name,
            organizationId,
            pushedAt: repository.pushedAt
              ? new Date(repository.pushedAt)
              : null,
          },
          update: {
            name: repository.name,
            organizationId,
            pushedAt: repository.pushedAt
              ? new Date(repository.pushedAt)
              : null,
          },
        })
      })
    )
  } catch (err) {
    throw err
  } finally {
    await prismaSingleTenantClient.$disconnect()
  }
}
