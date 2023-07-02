import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  SENTRY_DSN: z.string(),
  DB_NAME: z.string(),
  DB_USER: z.string(),
  DB_PASS: z.string(),
  GCP_PROJECT_ID: z.enum([
    'gdash-test',
    'gdash-dev',
    'gdash-stg',
    'gdash-prd',
  ]),
})

export const getEnv = () => envSchema.parse(process.env)
export const checkEnvOnInitServer = () => getEnv()
