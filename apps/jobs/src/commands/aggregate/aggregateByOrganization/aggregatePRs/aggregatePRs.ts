import { GraphQLClient } from 'graphql-request'
import { sleep } from '@g-dash/utils'
import { paginate } from './paginate'
import { getFirstPage, UserPR } from './getFirstPage'
import { getEnv, getSingleTenantPrismaClient } from '../../../../utils'

export const aggregatePRs = async (
  orgName: string,
  repositoryName: string
): Promise<void> => {
  const prismaSingleTenantClient = getSingleTenantPrismaClient()

  const githubClient = new GraphQLClient('https://api.github.com/graphql', {
    headers: {
      Authorization: 'Bearer ' + getEnv().GITHUB_PERSONAL_ACCESS_TOKEN,
      'X-Github-Next-Global-ID': '1',
    },
  })

  const prs: UserPR[] = []

  try {
    // get first page
    let {
      prs: firstPageResult,
      hasNextPage,
      cursor,
    } = await getFirstPage(githubClient, orgName, repositoryName)

    prs.push(...firstPageResult)

    // get paginated results
    while (hasNextPage && cursor) {
      await sleep(500)
      const {
        prs: _prs,
        hasNextPage: _hasNextPage,
        cursor: _cursor,
      } = await paginate(githubClient, orgName, repositoryName, cursor)

      prs.push(..._prs)
      hasNextPage = _hasNextPage
      cursor = _cursor
    }

    const { id: organizationId } =
      await prismaSingleTenantClient.organization.findUniqueOrThrow({
        where: {
          login: orgName,
        },
        select: {
          id: true,
        },
      })

    // upsert repositories (because repository name can be changed)
    await Promise.all(
      prs.map(async (pr) => {
        await prismaSingleTenantClient.pr.upsert({
          where: {
            id: pr.id,
          },
          create: {
            id: pr.id,
            organizationId,
            authorId: pr.author.id,
            title: pr.title,
            url: pr.url,
            additions: pr.additions,
            deletions: pr.deletions,
            changedFiles: pr.changedFiles,
            commentsTotalCount: pr.comments.totalCount,
            commitsTotalCount: pr.commits.totalCount,
            merged: pr.merged,
            closed: pr.closed,
            createdAt: pr.createdAt,
            closedAt: pr.closedAt,
            mergedAt: pr.mergedAt,
          },
          update: {
            organizationId,
            authorId: pr.author.id,
            title: pr.title,
            url: pr.url,
            additions: pr.additions,
            deletions: pr.deletions,
            changedFiles: pr.changedFiles,
            commentsTotalCount: pr.comments.totalCount,
            commitsTotalCount: pr.commits.totalCount,
            merged: pr.merged,
            closed: pr.closed,
            createdAt: pr.createdAt,
            closedAt: pr.closedAt,
            mergedAt: pr.mergedAt,
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
