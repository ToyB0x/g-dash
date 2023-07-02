import { z } from 'zod'

const envSchema = z.object({
  // REQUIRED
  NODE_ENV: z.enum(['development', 'production', 'test']),
  DB_NAME: z.string(),
  // RLS ENABLED
  DB_USER_MIGRATION: z.string(),
  DB_PASS_MIGRATION: z.string(),
  // RLS ENABLED
  DB_USER_RLS_ENABLED: z.string(),
  DB_PASS_RLS_ENABLED: z.string(),
  // RLS DISABLED
  DB_USER_RLS_DISABLED: z.string(),
  DB_PASS_RLS_DISABLED: z.string(),
  // GITHUB TOKEN
  // TODO: EnvからPERSONAL_ACCESS_TOKENを利用している箇所をDBから読み込むように修正(KMSで暗号化する)
  // https://github.com/users/ToyB0x/projects/1/views/1?pane=issue&itemId=32241358
  GITHUB_PERSONAL_ACCESS_TOKEN: z.string(),

  // OPTIONAL
  SENTRY_DSN: z.string().optional(),
  GCP_PROJECT_ID: z
    .enum(['gdash-test', 'gdash-dev', 'gdash-stg', 'gdash-prd'])
    .optional(),
})

export const getEnv = () => envSchema.parse(process.env)
export const checkEnvOnInitServer = () => getEnv()
