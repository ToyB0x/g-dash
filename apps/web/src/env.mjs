import { z } from 'zod'
import { createEnv } from '@t3-oss/env-nextjs'

export const env = createEnv({
  server: {
    // REQUIRED
    APPS_DB_NAME: z.string(),
    // RLS ENABLED
    APPS_DB_USER_RLS_ENABLED: z.string(),
    APPS_DB_PASS_RLS_ENABLED: z.string(),
    // RLS DISABLED
    APPS_DB_USER_RLS_DISABLED: z.string(),
    APPS_DB_PASS_RLS_DISABLED: z.string(),
    // DB CONNECTION POOL SIZE
    APPS_WEB_CONNECTION_LIMIT: z.coerce.number()
  },
  // client: {
  //   NEXT_PUBLIC_PUBLISHABLE_KEY: z.string().min(1),
  // },
  // For Next.js >= 13.4.4, you only need to destructure client variables:
  // experimental__runtimeEnv: {
    // NEXT_PUBLIC_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY,
  // },
})
