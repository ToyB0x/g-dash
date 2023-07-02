import { getSingleTenantPrismaClient } from '../../../utils'
import { aggregateRepositories } from './aggregateRepositories'

export const aggregateOrganization = async (orgName: string): Promise<void> => {
  // TODO: orgIdを利用してRLSを有効化(/apps/jobs)
  // https://github.com/users/ToyB0x/projects/1/views/1?pane=issue&itemId=32240414
  const prismaSingleTenantClient = getSingleTenantPrismaClient()

  try {
    await aggregateRepositories(orgName)
  } catch (err) {
    throw err
  } finally {
    await prismaSingleTenantClient.$disconnect()
  }
}
