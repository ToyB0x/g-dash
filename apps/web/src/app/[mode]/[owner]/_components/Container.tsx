import 'server-only'

import { FC } from 'react'
import ActivityMap from '@/graphs/activityMap'
import { GraphArgs } from '@/graphs'
import CommitBar from '@/graphs/commitBar'
// import PrBar from '@/graphs/prBar'
// import ReviewBar from '@/graphs/reviewBar'
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
        days={graphArgs.days}
      />
      <StatCardMergedSpeed
        orgId={graphArgs.orgId}
        userIds={graphArgs.userIds}
        days={graphArgs.days}
      />
      <StatCardReviews
        orgId={graphArgs.orgId}
        userIds={graphArgs.userIds}
        days={graphArgs.days}
      />
      <StatCardWaitingReviews
        orgId={graphArgs.orgId}
        userIds={graphArgs.userIds}
        days={graphArgs.days}
      />
      <StatCardReleases
        orgId={graphArgs.orgId}
        userIds={graphArgs.userIds}
        days={graphArgs.days}
      />
      <StatCardVulns
        orgId={graphArgs.orgId}
        userIds={graphArgs.userIds}
        days={graphArgs.days}
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
        days={graphArgs.days}
      />
      <CommitBar
        orgId={graphArgs.orgId}
        userIds={graphArgs.userIds}
        days={graphArgs.days}
      />
    </div>

    {/*<div*/}
    {/*  style={{*/}
    {/*    display: 'grid',*/}
    {/*    gridTemplateColumns: '1fr 1fr',*/}
    {/*    gap: '1%',*/}
    {/*    height: '420px',*/}
    {/*  }}*/}
    {/*>*/}
    {/*  <PrBar*/}
    {/*    orgId={graphArgs.orgId}*/}
    {/*    userIds={graphArgs.userIds}*/}
    {/*    days={graphArgs.days}*/}
    {/*  />*/}
    {/*  <ReviewBar*/}
    {/*    orgId={graphArgs.orgId}*/}
    {/*    userIds={graphArgs.userIds}*/}
    {/*    days={graphArgs.days}*/}
    {/*  />*/}
    {/*</div>*/}

    <div style={{ height: '620px', width: 'full' }}>
      <ActivityMap
        orgId={graphArgs.orgId}
        userIds={graphArgs.userIds}
        days={graphArgs.days}
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
          days={graphArgs.days}
        />
        <ReviewRankings
          orgId={graphArgs.orgId}
          userIds={graphArgs.userIds}
          days={graphArgs.days}
        />
        <CategoryPieChart
          orgId={graphArgs.orgId}
          userIds={graphArgs.userIds}
          days={graphArgs.days}
        />
      </div>
    </div>
  </>
)
