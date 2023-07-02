import { execSync } from 'child_process'
import { getEnv } from '../../utils'

export const deploy = async (): Promise<void> => {
  const { DB_NAME,DB_USER, DB_PASS  } = getEnv()
  const dbURL = `mysql://${DB_USER}:${DB_PASS}@aws.connect.psdb.cloud/${DB_NAME}?sslaccept=strict`

  try {
    const stdout = execSync(
      `DATABASE_URL="${dbURL}" yarn workspace @g-dash/database prisma migrate deploy`
    )
    console.log(stdout.toString())
    console.log('Migration completed successfully.')
  } catch (e: any & { stdout: Buffer; stderr: Buffer }) {
    // NOTE: hide DATABASE_URL on error for security reasons
    if (
      e.stdout.toString().includes('DATABASE_URL') ||
      e.stdout.toString().includes('mysql://')
    ) {
      console.info(
        "Log is masked because this error message includes 'DATABASE_URL' or 'mysql://'.",
        '**********'
      )
    } else {
      console.info(e.stdout.toString())
    }

    if (
      e.stderr.toString().includes('DATABASE_URL') ||
      e.stderr.toString().includes('mysql://')
    ) {
      console.error(
        "Log is masked because this error message includes 'DATABASE_URL' or 'mysql://'.",
        '**********'
      )
    } else {
      console.error(e.stderr.toString())
    }

    process.exit(1)
  }
}
