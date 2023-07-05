import { GraphQLClient } from 'graphql-request'
import { graphql } from '../../../../../generated/gql'
import { UserPR } from './getFirstPage'

export const paginate = async (
  graphQLClient: GraphQLClient,
  orgName: string,
  repositoryName: string,
  cursor: string
): Promise<{
  prs: UserPR[]
  hasNextPage: boolean
  cursor: string | undefined | null
}> => {
  const prsQuery = graphql(/* GraphQL */ `
    query paginatePrs($owner: String!, $name: String!, $after: String) {
      repository(owner: $owner, name: $name) {
        pullRequests(
          orderBy: { field: CREATED_AT, direction: DESC }
          after: $after
          first: 100
        ) {
          edges {
            cursor
            node {
              id
              author {
                avatarUrl
                ... on User {
                  id
                }
              }
              comments {
                totalCount
              }
              commits {
                totalCount
              }
              createdAt
              merged
              mergedAt
              additions
              deletions
              changedFiles
              closed
              closedAt
              title
              url
            }
          }
          totalCount
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    }
  `)

  const paginatePrsResult = await graphQLClient.request(prsQuery, {
    owner: orgName,
    name: repositoryName,
    after: cursor,
  })

  if (!paginatePrsResult.repository) throw Error('null repository')

  if (!paginatePrsResult.repository.pullRequests.edges)
    throw Error('null edges')

  const paginatedPrs = paginatePrsResult.repository.pullRequests.edges
    .map((e) => e?.node)
    .filter<UserPR>((n): n is UserPR => n?.author?.__typename === 'User')
    .map((userPr) => {
      return {
        id: userPr.id,
        title: userPr.title,
        url: userPr.url,
        author: {
          id: userPr.author.id,
          avatarUrl: userPr.author.avatarUrl,
        },
        comments: {
          totalCount: userPr.comments.totalCount,
        },
        commits: {
          totalCount: userPr.commits.totalCount,
        },
        createdAt: userPr.createdAt,
        merged: userPr.merged,
        mergedAt: userPr.mergedAt,
        additions: userPr.additions,
        deletions: userPr.deletions,
        changedFiles: userPr.changedFiles,
        closed: userPr.closed,
        closedAt: userPr.closedAt,
      }
    })

  if (!paginatePrsResult.repository.pullRequests.pageInfo.endCursor)
    throw Error('falsy endCursor')

  return {
    prs: paginatedPrs,
    hasNextPage: paginatePrsResult.repository.pullRequests.pageInfo.hasNextPage,
    cursor: paginatePrsResult.repository.pullRequests.pageInfo.endCursor,
  }
}
