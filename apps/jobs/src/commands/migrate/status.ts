import { execSync } from 'child_process'
import { getEnv } from '../../utils'
import { getDbUrl } from '@g-dash/database'
import { execWithScrubbedLog } from './lib'

export const status = () => {
  const { DB_NAME, DB_USER_MIGRATION, DB_PASS_MIGRATION } = getEnv()
  const dbURL = getDbUrl({
    DB_NAME,
    DB_USER: DB_USER_MIGRATION,
    DB_PASS: DB_PASS_MIGRATION,
    CONNECTION_LIMIT: 1,
  })

  execWithScrubbedLog(
    execSync,
    `DATABASE_URL="${dbURL}" yarn workspace @g-dash/database prisma migrate status`,
  )
}
