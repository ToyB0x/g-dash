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

        // 後続処理のため事前にcommit authorをUserテーブルに追加
        await Promise.all(
          pr.commits.nodes.map(
            async (n) =>
              await prismaSingleTenantClient.user.upsert({
                where: {
                  id: n.commit.author.user.id,
                },
                create: {
                  id: n.commit.author.user.id,
                  login: n.commit.author.user.login,
                  name: n.commit.author.user.name,
                  avatarUrl: n.commit.author.user.avatarUrl,
                },
                update: {
                  login: n.commit.author.user.login,
                  name: n.commit.author.user.name,
                  avatarUrl: n.commit.author.user.avatarUrl,
                },
              }),
          ),
        )

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

        // upsert commits
        await Promise.all(
          pr.commits.nodes.map(async (commit) => {
            await prismaSingleTenantClient.commit.upsert({
              where: {
                id: commit.id,
              },
              create: {
                id: commit.id,
                organizationId,
                url: commit.commit.url,
                committedDate: commit.commit.committedDate,
                authorId: commit.commit.author.user.id,
              },
              update: {
                url: commit.commit.url,
                committedDate: commit.commit.committedDate,
                authorId: commit.commit.author.user.id,
              },
            })
          }),
        )

        // upsert reviews
        await Promise.all(
          pr.reviews.nodes.map(async (review) => {
            const authors = await prismaSingleTenantClient.user.findMany({
              where: {
                login: review.author.login,
              },
            })

            // not unique, because sync delays can cause duplicates login ids
            if (authors.length !== 1) return
            const author = authors[0]

            await prismaSingleTenantClient.review.upsert({
              where: {
                id: review.id,
              },
              create: {
                id: review.id,
                organizationId,
                url: review.url,
                createdAt: review.createdAt,
                authorId: author.id,
              },
              update: {
                url: review.url,
                createdAt: review.createdAt,
                authorId: author.id,
              },
            })
          }),
        )
      }),
    )
  } catch (err) {
    throw err
  } finally {
    await prismaSingleTenantClient.$disconnect()
  }
}
