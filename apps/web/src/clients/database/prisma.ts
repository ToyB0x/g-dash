import { env } from '@/env.mjs'
import { PrismaClient, getDbUrl } from '@g-dash/database'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const {
  APPS_DB_NAME,
  APPS_DB_PORT,
  APPS_DB_USER_RLS_ENABLED,
  APPS_DB_PASS_RLS_ENABLED,
  APPS_WEB_CONNECTION_LIMIT,
} = env

const dbUrl = getDbUrl({
  DB_NAME: APPS_DB_NAME,
  DB_PORT: APPS_DB_PORT,
  DB_USER: APPS_DB_USER_RLS_ENABLED,
  DB_PASS: APPS_DB_PASS_RLS_ENABLED,
  CONNECTION_LIMIT: APPS_WEB_CONNECTION_LIMIT,
})

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: dbUrl,
      },
    },
  })

if (env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export const getSingleTenantPrismaClient = (): PrismaClient => prisma
