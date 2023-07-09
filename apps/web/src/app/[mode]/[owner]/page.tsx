'use client'
import 'client-only'

import { Box, Heading, SimpleGrid } from '@chakra-ui/react'
import { Modes } from '@g-dash/types'
import { StatCard } from '@g-dash/ui'
import { BsStar } from 'react-icons/bs'
import { GiBiohazard, GiSandsOfTime } from 'react-icons/gi'
import React from 'react'
import { IoIosGitPullRequest } from 'react-icons/io'
import { GoCommentDiscussion } from 'react-icons/go'
import { SlSpeedometer } from 'react-icons/sl'
import { PieChart } from './components'

export default function Page({
  params,
}: {
  params: { mode: (typeof Modes)[keyof typeof Modes]; owner: string }
}) {
  return (
    <Box p={8}>
      <Heading>Main Dashboard</Heading>
      <Box mt={4}>
        <SimpleGrid columns={{ base: 1, md: 6 }} spacing={8}>
          <StatCard
            title="月間リリース数"
            stat="9"
            icon={<BsStar size="3rem" />}
          />
          <StatCard
            title="マージ速度"
            stat="6/day"
            icon={<SlSpeedometer size="3rem" />}
          />
          <StatCard
            title="マージ済みPR"
            stat="32"
            icon={<IoIosGitPullRequest size="3rem" />}
          />
          <StatCard
            title="レビュー数"
            stat="12"
            icon={<GoCommentDiscussion size="3rem" />}
          />
          <StatCard
            title="レビュー待ちPR"
            stat="9"
            icon={<GiSandsOfTime size="3rem" />}
          />
          <StatCard
            title="脆弱なパッケージ"
            stat="126"
            icon={<GiBiohazard size="3rem" />}
          />
        </SimpleGrid>
      </Box>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} mt={8} h="34vh">
        <Box bg="skyblue">
          3ヶ月の変動曲線グラフ(PRマージ数 / リリース数 / レビュー数 /
          レビュー待ちPR数)
        </Box>
        <Box bg="skyblue">2週間分のコミット棒グラフ</Box>
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} mt={8} h="34vh">
        <Box bg="skyblue">PRランキンング</Box>
        <Box bg="skyblue">レビューランキンング</Box>
        <PieChart />
      </SimpleGrid>
    </Box>
  )
}
