import { GraphQLClient } from 'graphql-request'
import { graphql } from '../../../../../generated/gql'

export const paginate = async (
  graphQLClient: GraphQLClient,
  orgName: string,
  cursor: string,
) => {
  const paginateRepositoriesQuery = graphql(/* GraphQL */ `
    query paginateRepositories($organization: String!, $after: String) {
      organization(login: $organization) {
        id
        login
        repositories(
          orderBy: { field: PUSHED_AT, direction: DESC }
          after: $after
          first: 100
        ) {
          pageInfo {
            hasNextPage
            endCursor
          }
          edges {
            node {
              id
              name
              pushedAt
              vulnerabilityAlerts(first: 100, states: [OPEN]) {
                totalCount
              }
            }
          }
        }
      }
    }
  `)

  const paginateRepositoriesResult = await graphQLClient.request(
    paginateRepositoriesQuery,
    {
      organization: orgName,
      after: cursor,
    },
  )

  if (!paginateRepositoriesResult.organization) throw Error('null organization')

  if (!paginateRepositoriesResult.organization.repositories.edges)
    throw Error('null edges')

  const paginatedRepositories =
    paginateRepositoriesResult.organization.repositories.edges.map((e) => {
      if (!e) throw Error('null edge')
      if (!e.node) throw Error('null node')
      return {
        id: e.node.id,
        name: e.node.name,
        pushedAt: e.node.pushedAt ? e.node.pushedAt : null,
        vulnerabilityAlertsTotalCount: e.node.vulnerabilityAlerts
          ? e.node.vulnerabilityAlerts.totalCount
          : 0,
      }
    })

  if (!paginateRepositoriesResult.organization.repositories.pageInfo.endCursor)
    throw Error('falsy endCursor')

  return {
    repositories: paginatedRepositories,
    hasNextPage:
      paginateRepositoriesResult.organization.repositories.pageInfo.hasNextPage,
    cursor:
      paginateRepositoriesResult.organization.repositories.pageInfo.endCursor,
  }
}
