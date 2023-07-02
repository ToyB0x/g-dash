import { GraphQLClient } from 'graphql-request'
import { graphql } from '../../../../generated/gql'
import { getEnv, getSingleTenantPrismaClient } from '../../../utils'

export const aggregateRepositories = async (orgName: string): Promise<void> => {
  const prismaSingleTenantClient = getSingleTenantPrismaClient()

  const githubClient = new GraphQLClient('https://api.github.com/graphql', {
    headers: {
      Authorization: 'Bearer ' + getEnv().GITHUB_PERSONAL_ACCESS_TOKEN,
    },
  })

  try {
    // TODO: リポジトリ取得のpaginationを実装
    // https://github.com/users/ToyB0x/projects/1/views/1?pane=issue&itemId=32241189
    const repositoriesQuery = graphql(/* GraphQL */ `
      query Repositories($organization: String!) {
        organization(login: $organization) {
          id
          login
          repositories(
            orderBy: { field: PUSHED_AT, direction: DESC }
            first: 100
          ) {
            edges {
              node {
                id
                name
                pushedAt
              }
            }
          }
        }
      }
    `)

    const repositoriesQueryResult = await githubClient.request(
      repositoriesQuery,
      {
        organization: orgName,
      }
    )

    if (!repositoriesQueryResult.organization) throw Error('null organization')
    const orgId = repositoriesQueryResult.organization.id

    if (!repositoriesQueryResult.organization.repositories.edges)
      throw Error('null edges')

    const repositories =
      repositoriesQueryResult.organization.repositories.edges.map((e) => {
        if (!e) throw Error('null edge')
        if (!e.node) throw Error('null node')
        return {
          id: e.node.id,
          name: e.node.name,
          pushedAt: e.node.pushedAt,
        }
      })

    const login = repositoriesQueryResult.organization.login
    await prismaSingleTenantClient.organization.upsert({
      where: {
        id: orgId,
      },
      create: {
        id: orgId,
        login,
      },
      update: {
        login,
      },
    })

    await Promise.all(
      repositories.map(async (repository) => {
        await prismaSingleTenantClient.repository.upsert({
          where: {
            id: repository.id,
          },
          create: {
            id: repository.id,
            name: repository.name,
            organizationId: orgId,
            pushedAt: repository.pushedAt
              ? new Date(repository.pushedAt)
              : null,
          },
          update: {
            name: repository.name,
            organizationId: orgId,
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
