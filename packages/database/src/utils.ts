export const getDbUrl = ({
  DB_NAME,
  DB_USER,
  DB_PASS,
  CONNECTION_LIMIT,
}: {
  DB_NAME: string
  DB_USER: string
  DB_PASS: string
  CONNECTION_LIMIT: number
}): string =>
  `postgresql://${DB_USER}:${DB_PASS}@127.0.0.1:5432/${DB_NAME}?schema=public&connection_limit=${CONNECTION_LIMIT}`
