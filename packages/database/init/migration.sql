/* NOTE: prismaのshadow databaseがmainのdatabaseとDBユーザを共用しているため
 * テスト中のprisma migrateが失敗してしまう対策としてユーザ作成はPrismaのマイグレーションの管理外とする
 * (テーブルアクセス権のGRANT適用はテーブル作成後に行う必要があるためprismaの管理対象とする)
 *
 * ref: https://github.com/prisma/prisma/issues/6581#issuecomment-1373961576
 */

-- Create single tenant user (with default pass for CI)
CREATE USER "rls_enabled" WITH NOBYPASSRLS PASSWORD 'pass';

-- Create cross tenant user (with default pass for CI)
CREATE USER "rls_disabled" WITH BYPASSRLS PASSWORD 'pass';
