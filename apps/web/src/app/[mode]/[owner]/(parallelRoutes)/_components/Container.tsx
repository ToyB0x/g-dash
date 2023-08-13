import 'server-only'

import { FC } from 'react'
import ActivityMap from '@/graphs/activityMap'
import { GraphArgs } from '@/graphs'
import CommitBar from '@/graphs/commitBar'
import PrChart from '@/graphs/prChart'
import CategoryPieChart from '@/graphs/categoryPieChart'
import PrRankings from '@/graphs/prRankings'
import ReviewRankings from '@/graphs/reviewRankings'
import StatCardMerged from '@/graphs/statCardMerged'
import StatCardMergedSpeed from '@/graphs/statCardMergedSpeed'
import StatCardReviews from '@/graphs/statCardReviews'
import StatCardWaitingReviews from '@/graphs/statCardWaitingReviews'
import StatCardReleases from '@/graphs/statCardReleases'
import StatCardVulns from '@/graphs/statCardVulns'
import CheckBoxes from './CheckBoxes'

type Props = {
  graphArgs: GraphArgs
}

export const Container: FC<Props> = ({ graphArgs }) => (
  <>
    <CheckBoxes orgId={graphArgs.orgId} />
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr',
        gap: '1%',
        height: '100px',
      }}
    >
      <StatCardMerged
        orgId={graphArgs.orgId}
        userIds={graphArgs.userIds}
        startDate={graphArgs.startDate}
      />
      <StatCardMergedSpeed
        orgId={graphArgs.orgId}
        userIds={graphArgs.userIds}
        startDate={graphArgs.startDate}
      />
      <StatCardReviews
        orgId={graphArgs.orgId}
        userIds={graphArgs.userIds}
        startDate={graphArgs.startDate}
      />
      <StatCardWaitingReviews
        orgId={graphArgs.orgId}
        userIds={graphArgs.userIds}
        startDate={graphArgs.startDate}
      />
      <StatCardReleases
        orgId={graphArgs.orgId}
        userIds={graphArgs.userIds}
        startDate={graphArgs.startDate}
      />
      <StatCardVulns
        orgId={graphArgs.orgId}
        userIds={graphArgs.userIds}
        startDate={graphArgs.startDate}
      />
    </div>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1%',
        height: '420px',
      }}
    >
      <PrChart
        orgId={graphArgs.orgId}
        userIds={graphArgs.userIds}
        startDate={graphArgs.startDate}
      />
      <CommitBar
        orgId={graphArgs.orgId}
        userIds={graphArgs.userIds}
        startDate={graphArgs.startDate}
      />
    </div>

    <div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '1%',
        }}
      >
        <PrRankings
          orgId={graphArgs.orgId}
          userIds={graphArgs.userIds}
          startDate={graphArgs.startDate}
        />
        <ReviewRankings
          orgId={graphArgs.orgId}
          userIds={graphArgs.userIds}
          startDate={graphArgs.startDate}
        />
        <CategoryPieChart
          orgId={graphArgs.orgId}
          userIds={graphArgs.userIds}
          startDate={graphArgs.startDate}
        />
      </div>
    </div>
    <div style={{ height: '600px', width: '1200px' }}>
      <ActivityMap
        orgId={graphArgs.orgId}
        userIds={graphArgs.userIds}
        startDate={graphArgs.startDate}
      />
    </div>
  </>
)
