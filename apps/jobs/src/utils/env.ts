import { z } from 'zod'

const envSchema = z.object({
  // REQUIRED
  NODE_ENV: z.enum(['development', 'production', 'test']),
  DB_NAME: z.string(),
  DB_USER: z.string(),
  DB_PASS: z.string(),

  // OPTIONAL
  SENTRY_DSN: z.string().optional(),
  GCP_PROJECT_ID: z
    .enum(['gdash-test', 'gdash-dev', 'gdash-stg', 'gdash-prd'])
    .optional(),
})

export const getEnv = () => envSchema.parse(process.env)
export const checkEnvOnInitServer = () => getEnv()
