export const getDbUrl = ({
  DB_NAME,
  DB_USER,
  DB_PASS,
}: {
  DB_NAME: string;
  DB_USER: string;
  DB_PASS: string;
}): string =>
  `postgresql://${DB_USER}:${DB_PASS}@127.0.0.1:5432/${DB_NAME}?schema=public&connection_limit=1`;
