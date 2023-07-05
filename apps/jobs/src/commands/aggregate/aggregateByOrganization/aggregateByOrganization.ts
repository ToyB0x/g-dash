import { getSingleTenantPrismaClient } from '../../../utils'
import { aggregateRepositories } from './aggregateRepositories'
import { aggregatePRs } from './aggregatePRs'

export const maxOld = new Date(
  Date.now() - 60 * 60 * 24 * 30 * 6 * 1000
).getTime() // half year

export const aggregateByOrganization = async (
  orgName: string
): Promise<void> => {
  // TODO: orgIdを利用してRLSを有効化(/apps/jobs)
  // https://github.com/users/ToyB0x/projects/1/views/1?pane=issue&itemId=32240414
  const prismaSingleTenantClient = getSingleTenantPrismaClient()

  try {
    const repositoryNames = await aggregateRepositories(orgName)
    if (repositoryNames.length !== new Set(repositoryNames).size)
      throw new Error('duplicate repository name')

    console.log('aggregatePRs for each repository', repositoryNames.length)
    for (const [index, repositoryName] of repositoryNames.entries()) {
      console.info(`trying repository: ${index} / ${repositoryNames.length}`)
      await aggregatePRs(orgName, repositoryName)
    }
  } catch (err) {
    throw err
  } finally {
    await prismaSingleTenantClient.$disconnect()
  }
}
