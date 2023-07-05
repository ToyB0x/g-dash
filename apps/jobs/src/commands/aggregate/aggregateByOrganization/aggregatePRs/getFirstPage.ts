import { GraphQLClient } from 'graphql-request'
import { graphql } from '../../../../../generated/gql'

export type UserPR = {
  id: string
  title: string
  url: string
  author: {
    id: string
    avatarUrl: string
  }
  comments: {
    totalCount: number
  }
  commits: {
    totalCount: number
  }
  createdAt: string
  merged: boolean
  mergedAt: string | undefined | null
  additions: number
  deletions: number
  changedFiles: number
  closed: boolean
  closedAt: string | undefined | null
}

export const getFirstPage = async (
  graphQLClient: GraphQLClient,
  orgName: string,
  repositoryName: string
): Promise<{
  prs: UserPR[]
  hasNextPage: boolean
  cursor: string | undefined | null
}> => {
  const prsQuery = graphql(/* GraphQL */ `
    query prs($owner: String!, $name: String!) {
      repository(owner: $owner, name: $name) {
        pullRequests(
          orderBy: { field: UPDATED_AT, direction: DESC }
          states: MERGED
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

  const prsResult = await graphQLClient.request(prsQuery, {
    owner: orgName,
    name: repositoryName,
  })

  if (!prsResult.repository) throw Error('null repository')

  if (!prsResult.repository.pullRequests.edges) throw Error('null edges')

  const prs = prsResult.repository.pullRequests.edges
    .map((e) => e?.node)
    .filter<UserPR>((n): n is UserPR => n?.author?.__typename === 'User')
    .map((userPr) => {
      return {
        id: userPr.id,
        title: userPr.title,
        url: userPr.url,
        author: {
          avatarUrl: userPr.author.avatarUrl,
          id: userPr.author.id,
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

  return {
    prs,
    hasNextPage: prsResult.repository.pullRequests.pageInfo.hasNextPage,
    cursor: prsResult.repository.pullRequests.pageInfo.endCursor,
  }
}
