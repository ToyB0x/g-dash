import { execSync } from 'child_process'
import { getEnv } from '../../utils'
import { execWithScrubbedLog, getDbUrl } from './lib'

export const status = () => {
  const dbURL = getDbUrl({ ...getEnv() })
  execWithScrubbedLog(
    execSync,
    `DATABASE_URL="${dbURL}" yarn workspace @g-dash/database prisma migrate status`
  )
}
