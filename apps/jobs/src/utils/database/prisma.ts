import { PrismaClient, getDbUrl } from '@g-dash/database'
import { getEnv } from '../env'

export const getSingleTenantPrismaClient = () => {
  const { DB_NAME, DB_USER_RLS_ENABLED, DB_PASS_RLS_ENABLED } = getEnv()

  const dbUrl = getDbUrl({
    DB_NAME,
    DB_USER: DB_USER_RLS_ENABLED,
    DB_PASS: DB_PASS_RLS_ENABLED,
    CONNECTION_LIMIT: 1,
  })

  return new PrismaClient({
    datasources: {
      db: {
        url: dbUrl,
      },
    },
  })
}
