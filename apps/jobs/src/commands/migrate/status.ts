import { execSync } from 'child_process'
import { getEnv } from '../../utils'

export const status = async (): Promise<void> => {
  const { DB_NAME,DB_USER, DB_PASS  } = getEnv()
  const dbURL = `postgresql://${DB_USER}:${DB_PASS}@127.0.0.1:5432/${DB_NAME}?schema=public&connection_limit=1`

  try {
    const stdout = execSync(
      `DATABASE_URL="${dbURL}" yarn workspace @g-dash/database prisma migrate status`
    )
    console.log(stdout.toString())
    console.log('Migration completed successfully.')
  } catch (e: any & { stdout: Buffer; stderr: Buffer }) {
    // NOTE: hide DATABASE_URL on error for security reasons
    if (
      e.stdout.toString().includes('DATABASE_URL') ||
      e.stdout.toString().includes('postgresql://')
    ) {
      console.info(
        "Log is masked because this error message includes 'DATABASE_URL' or 'postgresql://'.",
        '**********'
      )
    } else {
      console.info(e.stdout.toString())
    }

    if (
      e.stderr.toString().includes('DATABASE_URL') ||
      e.stderr.toString().includes('postgresql://')
    ) {
      console.error(
        "Log is masked because this error message includes 'DATABASE_URL' or 'postgresql://'.",
        '**********'
      )
    } else {
      console.error(e.stderr.toString())
    }

    process.exit(1)
  }
}
