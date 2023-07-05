import { getSingleTenantPrismaClient } from '../../../utils'
import { aggregateRepositories } from './aggregateRepositories'
import { aggregatePRs } from './aggregatePRs'

export const aggregateByOrganization = async (
  orgName: string
): Promise<void> => {
  // TODO: orgIdを利用してRLSを有効化(/apps/jobs)
  // https://github.com/users/ToyB0x/projects/1/views/1?pane=issue&itemId=32240414
  const prismaSingleTenantClient = getSingleTenantPrismaClient()

  try {
    const repositoryNames = await aggregateRepositories(orgName)
    await Promise.all(
      repositoryNames.map(async (repositoryName) => {
        await aggregatePRs(orgName, repositoryName)
      })
    )
  } catch (err) {
    throw err
  } finally {
    await prismaSingleTenantClient.$disconnect()
  }
}
