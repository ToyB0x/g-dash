export const getDbUrl = ({
  DB_NAME,
  DB_USER,
  DB_PASS,
  DB_PORT,
  CONNECTION_LIMIT,
}: {
  DB_NAME: string
  DB_USER: string
  DB_PASS: string
  DB_PORT: number
  CONNECTION_LIMIT: number
}): string =>
  `postgresql://${DB_USER}:${DB_PASS}@127.0.0.1:${DB_PORT}/${DB_NAME}?schema=public&connection_limit=${CONNECTION_LIMIT}`
