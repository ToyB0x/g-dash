import { Command } from 'commander'
import { status } from './status'
import { deploy } from './deploy'

export const makeMigrateCommand = () => {
  const migrate = new Command('migrate')
  migrate.description('migrate related commands.')

  migrate
    .command('status')
    .description('show migrate status')
    .action(async () => await status())

  migrate
    .command('deploy')
    .description('deploy migration')
    .action(async () => await deploy())

  return migrate
}
