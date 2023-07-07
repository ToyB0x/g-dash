import { GraphQLClient } from 'graphql-request'
import { graphql } from '../../../../../generated/gql'

export const getFirstPage = async (
  graphQLClient: GraphQLClient,
  orgName: string,
) => {
  const repositoriesQuery = graphql(/* GraphQL */ `
    query repositories($organization: String!) {
      organization(login: $organization) {
        id
        login
        repositories(
          orderBy: { field: PUSHED_AT, direction: DESC }
          first: 100
        ) {
          totalCount
          pageInfo {
            hasNextPage
            endCursor
          }
          edges {
            node {
              id
              name
              pushedAt
              hasVulnerabilityAlertsEnabled
              vulnerabilityAlerts(first: 100, states: [OPEN]) {
                totalCount
              }
            }
          }
        }
      }
    }
  `)

  const repositoriesResult = await graphQLClient.request(repositoriesQuery, {
    organization: orgName,
  })

  if (!repositoriesResult.organization) throw Error('null organization')

  if (!repositoriesResult.organization.repositories.edges)
    throw Error('null edges')

  const repositories = repositoriesResult.organization.repositories.edges.map(
    (e) => {
      if (!e) throw Error('null edge')
      if (!e.node) throw Error('null node')
      return {
        id: e.node.id,
        name: e.node.name,
        pushedAt: e.node.pushedAt ? e.node.pushedAt : null,
        hasVulnerabilityAlertsEnabled: e.node.hasVulnerabilityAlertsEnabled,
        vulnerabilityAlertsTotalCount: e.node.vulnerabilityAlerts
          ? e.node.vulnerabilityAlerts.totalCount
          : 0,
      }
    },
  )

  return {
    repositories,
    organization: {
      id: repositoriesResult.organization.id,
      login: repositoriesResult.organization.login,
    },
    hasNextPage:
      repositoriesResult.organization.repositories.pageInfo.hasNextPage,
    cursor: repositoriesResult.organization.repositories.pageInfo.endCursor,
  }
}
