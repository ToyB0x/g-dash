import { GraphQLClient } from 'graphql-request'
import { sleep } from '@g-dash/utils'
import { paginate } from './paginate'
import { getFirstPage, UserPR } from './getFirstPage'
import { getEnv, getSingleTenantPrismaClient } from '../../../../utils'
import { maxOld } from '../aggregateByOrganization'

export const aggregatePRs = async (
  orgName: string,
  repositoryName: string,
): Promise<void> => {
  const prismaSingleTenantClient = getSingleTenantPrismaClient()

  const githubClient = new GraphQLClient('https://api.github.com/graphql', {
    headers: {
      Authorization:
        'Bearer ' + getEnv().APPS_JOBS_GITHUB_PERSONAL_ACCESS_TOKEN,
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
      // stop if the oldest PR is older than maxOld
      if (prs.some((pr) => new Date(pr.createdAt).getTime() < maxOld)) break

      let result = await paginate(githubClient, orgName, repositoryName, cursor)

      while ('retry-after' in result) {
        console.warn('retry-after', result['retry-after'])
        await sleep(Number(result['retry-after']) * 1000)
        result = await paginate(githubClient, orgName, repositoryName, cursor)
      }

      while ('x-ratelimit-remaining' in result) {
        console.warn('x-ratelimit-remaining', result['x-ratelimit-remaining'])
        const waitFor = Number(result['x-ratelimit-reset']) - Date.now()
        console.warn('waitFor', waitFor)
        await sleep(waitFor)
        result = await paginate(githubClient, orgName, repositoryName, cursor)
      }

      const { prs: _prs, hasNextPage: _hasNextPage, cursor: _cursor } = result
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
        await prismaSingleTenantClient.user.upsert({
          where: {
            id: pr.author.id,
          },
          create: {
            id: pr.author.id,
            login: pr.author.login,
            name: pr.author.name,
            avatarUrl: pr.author.avatarUrl,
          },
          update: {
            login: pr.author.login,
            name: pr.author.name,
            avatarUrl: pr.author.avatarUrl,
          },
        })

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
      }),
    )
  } catch (err) {
    throw err
  } finally {
    await prismaSingleTenantClient.$disconnect()
  }
}
