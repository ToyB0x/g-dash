import { Command } from 'commander'
import { aggregateOrganization } from './aggregateOrganization'

export const makeAggregateCommand = () => {
  const aggregate = new Command('aggregate')
  aggregate.description('aggregate related commands.')

  aggregate
    .command('organization')
    .description('aggregate specific organization repositories.')
    .argument('<orgName>', 'orgName to aggregate repositories')
    .action(async (orgName: string) => await aggregateOrganization(orgName))

  return aggregate
}
