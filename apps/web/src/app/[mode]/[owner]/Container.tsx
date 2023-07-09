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
} from '@chakra-ui/react'
import { StatCard } from '@g-dash/ui'
import { BsStar } from 'react-icons/bs'
import { GiBiohazard, GiSandsOfTime } from 'react-icons/gi'
import { IoIosGitPullRequest } from 'react-icons/io'
import { GoCommentDiscussion } from 'react-icons/go'
import { SlSpeedometer } from 'react-icons/sl'
import { BarChart, LineChart, PieChart } from './components'

type Props = {
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
    [dateString: string]: number
  }
}

export const Container: FC<Props> = ({
  releaseCount,
  mergedCount,
  reviewCount,
  waitingReviewCount,
  vulnerabilityAlertCount,
  lineChartSeries,
  barChartSeries,
}) => (
  <Box pt={4} px={8}>
    <Heading>Main Dashboard</Heading>
    <Box mt={4}>
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
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} mt={8} h="35vh">
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
    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} mt={16} h="28vh">
      <Box bg="white" rounded="lg" p={4} shadow="xl">
        <Heading as="h3" fontSize="xl">
          PRランキンング
        </Heading>
        <Box p={4} h="28vh">
          <List>
            {[1, 2, 3, 4, 5].map((key) => (
              <ListItem key={key}>
                <HStack mb={5}>
                  {/*<Box>{key}</Box>*/}
                  <Avatar name="avatar" size="sm" />
                  <Box> user name</Box>
                  <Box> 3</Box>
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
            {[1, 2, 3, 4, 5].map((key) => (
              <ListItem key={key}>
                <HStack mb={5}>
                  {/*<Box>{key}</Box>*/}
                  <Avatar name="avatar" size="sm" />
                  <Box> user name</Box>
                  <Box> 3</Box>
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
        <PieChart />
      </Box>
    </SimpleGrid>
  </Box>
)
