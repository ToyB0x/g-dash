import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
})

export const getEnv = () => envSchema.parse(process.env)
export const checkEnvOnInitServer = () => getEnv()
