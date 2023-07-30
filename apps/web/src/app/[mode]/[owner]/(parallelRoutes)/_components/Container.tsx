'use client'
import 'client-only'

import { FC } from 'react'
import {
  Avatar,
  Box,
  Heading,
  HStack,
  List,
  ListItem,
  SimpleGrid,
  Stack,
} from '@chakra-ui/react'
import { StatCard } from '@g-dash/ui'
import { BsStar } from 'react-icons/bs'
import { GiBiohazard, GiSandsOfTime } from 'react-icons/gi'
import { IoIosGitPullRequest } from 'react-icons/io'
import { GoCommentDiscussion } from 'react-icons/go'
import { SlSpeedometer } from 'react-icons/sl'
import { BarChart, LineChart, PieChart } from './Charts'
import { UserFilterModalButton } from './Header'

type Props = {
  users: {
    id: string
    login: string
    avatarUrl: string
  }[]
  // Cards
  releaseCount: number
  mergedCount: number
  reviewCount: number
  waitingReviewCount: number
  vulnerabilityAlertCount: number
  // Charts
  lineChartSeries: {
    [dateString: string]: {
      open: number
      merged: number
      review: number
    }
  }
  barChartSeries: {
    login: string
    committedDate: Date
  }[]
  pieChartSeries: string[]
  // ranking
  prRankings: {
    login: string
    avatarUrl: string
    count: number
  }[]
  reviewRankings: {
    login: string
    avatarUrl: string
    count: number
  }[]
}

export const Container: FC<Props> = ({
  users,
  releaseCount,
  mergedCount,
  reviewCount,
  waitingReviewCount,
  vulnerabilityAlertCount,
  lineChartSeries,
  barChartSeries,
  pieChartSeries,
  prRankings,
  reviewRankings,
}) => (
  <Stack spacing={8}>
    <HStack justify="space-between">
      <Heading>Main Dashboard</Heading>
      <UserFilterModalButton users={users} />
    </HStack>
    <Box>
      <SimpleGrid columns={{ base: 1, md: 6 }} spacing={8}>
        <StatCard
          title="リリース数"
          stat={releaseCount + '/month'}
          icon={<BsStar size="3rem" />}
        />
        <StatCard
          title="マージ済みPR"
          stat={mergedCount + '/month'}
          icon={<IoIosGitPullRequest size="3rem" />}
        />
        <StatCard
          title="マージ速度"
          stat={Math.round(mergedCount / (30 - 8)) + '/day'}
          icon={<SlSpeedometer size="3rem" />}
        />
        <StatCard
          title="レビュー数"
          stat={reviewCount + '/month'}
          icon={<GoCommentDiscussion size="3rem" />}
        />
        <StatCard
          title="レビュー待ちPR"
          stat={waitingReviewCount.toString()}
          icon={<GiSandsOfTime size="3rem" />}
        />
        <StatCard
          title="脆弱なパッケージ"
          stat={vulnerabilityAlertCount.toString()}
          icon={<GiBiohazard size="3rem" />}
        />
      </SimpleGrid>
    </Box>
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
      <Box backgroundColor="white" rounded="lg" p={4} shadow="xl">
        <Heading as="h3" fontSize="xl">
          アクティビティ推移
        </Heading>
        <Box p={4} h="32vh">
          <LineChart lineChartSeries={lineChartSeries} />
        </Box>
      </Box>
      <Box backgroundColor="white" rounded="lg" p={4} shadow="xl">
        <Heading as="h3" fontSize="xl">
          コミット推移
        </Heading>
        <Box p={4} h="32vh">
          <BarChart barChartSeries={barChartSeries} />
        </Box>
      </Box>
    </SimpleGrid>
    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
      <Box bg="white" rounded="lg" p={4} shadow="xl">
        <Heading as="h3" fontSize="xl">
          PRランキンング
        </Heading>
        <Box p={4} h="28vh">
          <List>
            {prRankings
              .sort((a, b) => b.count - a.count)
              .slice(0, 5)
              .map((item) => (
                <ListItem key={item.login}>
                  <HStack mb={5} justifyContent="space-between">
                    <HStack spacing={6}>
                      <Avatar name="avatar" size="sm" src={item.avatarUrl} />
                      <Box>{item.login}</Box>
                    </HStack>
                    <Box>{item.count}</Box>
                  </HStack>
                </ListItem>
              ))}
          </List>
        </Box>
      </Box>

      <Box bg="white" rounded="lg" p={4} shadow="xl">
        <Heading as="h3" fontSize="xl">
          レビューランキンング
        </Heading>
        <Box p={4} h="28vh">
          <List>
            {reviewRankings
              .sort((a, b) => b.count - a.count)
              .slice(0, 5)
              .map((item) => (
                <ListItem key={item.login}>
                  <HStack mb={5} justifyContent="space-between">
                    <HStack spacing={6}>
                      <Avatar name="avatar" size="sm" src={item.avatarUrl} />
                      <Box>{item.login}</Box>
                    </HStack>
                    <Box>{item.count}</Box>
                  </HStack>
                </ListItem>
              ))}
          </List>
        </Box>
      </Box>
      <Box bg="white" rounded="lg" p={4} shadow="xl">
        <Heading as="h3" fontSize="xl">
          PR内訳
        </Heading>
        <PieChart prTitles={pieChartSeries} />
      </Box>
    </SimpleGrid>
  </Stack>
)
