import { execSync } from 'child_process'
import { getEnv, getDbUrl } from '../../utils'
import { execWithScrubbedLog } from './lib'

export const deploy = () => {
  const { DB_NAME, DB_USER_MIGRATION, DB_PASS_MIGRATION } = getEnv()
  const dbURL = getDbUrl({
    DB_NAME,
    DB_USER: DB_USER_MIGRATION,
    DB_PASS: DB_PASS_MIGRATION,
  })
  execWithScrubbedLog(
    execSync,
    `DATABASE_URL="${dbURL}" yarn workspace @g-dash/database prisma migrate deploy`,
  )
}
