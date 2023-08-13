import 'server-only'

import { FC } from 'react'
import ActivityMap from '@/graphs/activityMap'
import { GraphArgs } from '@/graphs'
import CommitBar from '@/graphs/commitBar'
import PrChart from '@/graphs/prChart'
import CategoryPieChart from '@/graphs/categoryPieChart'
import PrRankings from '@/graphs/prRankings'
import ReviewRankings from '@/graphs/reviewRankings'
import { StatCard } from '@g-dash/ui'
import { BsStar } from 'react-icons/bs'
import { SlSpeedometer } from 'react-icons/sl'
import { GoCommentDiscussion } from 'react-icons/go'
import { GiBiohazard, GiSandsOfTime } from 'react-icons/gi'
import StatCardMerged from '@/graphs/statCardMerged'

type Props = {
  graphArgs: GraphArgs
}

export const Container: FC<Props> = ({ graphArgs }) => (
  <>
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
      <StatCard
        title="マージ速度"
        stat={Math.round(20 / (30 - 8)) + '/day'}
        icon={<SlSpeedometer size="3rem" />}
      />
      <StatCard
        title="レビュー数"
        stat={20 + '/month'}
        icon={<GoCommentDiscussion size="3rem" />}
      />
      <StatCard
        title="レビュー待ちPR"
        stat={'20'}
        icon={<GiSandsOfTime size="3rem" />}
      />
      <StatCard
        title="リリース数"
        stat={10 + '/month'}
        icon={<BsStar size="3rem" />}
      />
      <StatCard
        title="脆弱なパッケージ"
        stat={'20'}
        icon={<GiBiohazard size="3rem" />}
      />
    </div>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1%',
        height: '450px',
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
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '1%',
        height: '300px',
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
    <div style={{ height: '600px', width: '1200px' }}>
      <ActivityMap
        orgId={graphArgs.orgId}
        userIds={graphArgs.userIds}
        startDate={graphArgs.startDate}
      />
    </div>
  </>
)
