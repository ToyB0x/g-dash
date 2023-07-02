import { getSingleTenantPrismaClient } from '../../utils'

export const aggregateOrganization = async (orgId: string): Promise<void> => {
  // TODO: orgIdを利用してRLSを有効化(/apps/jobs)
  // https://github.com/users/ToyB0x/projects/1/views/1?pane=issue&itemId=32240414
  const prismaSingleTenantClient = getSingleTenantPrismaClient()

  try {
    // TODO: 集計処理の実装
    // https://github.com/users/ToyB0x/projects/1/views/1?pane=issue&itemId=32240442
    console.log('IMPLEMENT ME!', orgId)
  } catch (err) {
    throw err
  } finally {
    await prismaSingleTenantClient.$disconnect()
  }
}
