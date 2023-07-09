import { env } from '@/env.mjs'
import { PrismaClient, getDbUrl } from '@g-dash/database'

let prismaClientInstance: PrismaClient | null = null
export const getSingleTenantPrismaClient = (): PrismaClient => {
  // 初期化済みの場合は初期化済みのクライアントを返す
  if (prismaClientInstance) return prismaClientInstance

  const {
    APPS_DB_NAME,
    APPS_DB_USER_RLS_ENABLED,
    APPS_DB_PASS_RLS_ENABLED,
    APPS_WEB_CONNECTION_LIMIT,
  } = env

  const dbUrl = getDbUrl({
    DB_NAME: APPS_DB_NAME,
    DB_USER: APPS_DB_USER_RLS_ENABLED,
    DB_PASS: APPS_DB_PASS_RLS_ENABLED,
    CONNECTION_LIMIT: APPS_WEB_CONNECTION_LIMIT,
  })

  prismaClientInstance = new PrismaClient({
    datasources: {
      db: {
        url: dbUrl,
      },
    },
  })

  return prismaClientInstance
}
