import { Command } from 'commander'
import * as Sentry from '@sentry/node'
import { checkEnvOnInitServer} from './utils'
import { makeMigrateCommand } from './commands/migrate'

const main = async () => {
  const{GCP_PROJECT_ID, SENTRY_DSN}  = checkEnvOnInitServer()

  Sentry.init({
    dsn: SENTRY_DSN,
    environment: GCP_PROJECT_ID,
  })

  const program = new Command()
  program.addCommand(makeMigrateCommand())

  try {
    await program.parseAsync()
  } catch (err) {
    console.error(err)
    Sentry.captureException(err, {
      level: 'fatal',
    })
    await Sentry.flush(3000)
    process.exit(1)
  }
}

main()
