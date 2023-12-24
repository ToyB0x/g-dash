'use client'
import 'client-only'

import { FC } from 'react'
import { Box, Heading } from '@chakra-ui/react'
import { ApexOptions } from 'apexcharts'
import ReactApexChart from 'react-apexcharts'

// windowエラーを消したい場合は以下のワークアラウンドが使えるがDynamicImportのため表示が1秒ほど遅くなる
// ref: https://github.com/apexcharts/react-apexcharts/issues/240
// import dynamic from 'next/dynamic'
// const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })

type Props = {
  committedDates: Date[]
  reviewedDates: Date[]
  days: number
}

export const UI: FC<Props> = ({ committedDates, reviewedDates, days }) => {
  const activityDates = [...committedDates, ...reviewedDates]

  // NOTE: gedDateでは1/1と2/1が重複してカウントされてしまうため0時の時点の日付文字を利用
  const lastMonthDateStrings = Array.from(Array(days).keys())
    .map((i) => {
      const date = new Date()
      date.setDate(date.getDate() - i)
      return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
      ).toDateString()
    })
    .reverse()

  const generateData = (startHour: number, endHour: number) =>
    lastMonthDateStrings.map((dateString, i) => {
      const boxDate = new Date(dateString)
      const y = activityDates.filter(
        (ad) =>
          boxDate.getFullYear() === ad.getFullYear() &&
          boxDate.getMonth() === ad.getMonth() &&
          boxDate.getDate() === ad.getDate() &&
          ad.getHours() >= startHour &&
          ad.getHours() < endHour,
      ).length

      const isOfficeHour =
        5 <= startHour &&
        startHour < 22 &&
        boxDate.getDay() !== 0 &&
        boxDate.getDay() !== 6

      return {
        x: boxDate.getDate().toString(),
        y: isOfficeHour ? y : y * -1,
      }
    })

  const series = Array.from(Array(24).keys())
    .map((i) => [i, i + 1])
    .map(([startHour, endHour]) => ({
      name: `${startHour}-${endHour}`,
      data: generateData(startHour, endHour),
    }))

  const options: ApexOptions = {
    colors: ['#14a202'],
    chart: {
      stacked: true,
      toolbar: {
        show: false,
      },
      animations: {
        enabled: false,
      },
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: lastMonthDateStrings.map((dateString) => {
        const date = new Date(dateString)
        if (date.getDay() === 0 || date.getDay() === 6)
          return `(${date.getMonth() + 1 + '/' + date.getDate()})`
        return date.getMonth() + 1 + '/' + date.getDate()
      }),
      labels: {
        style: {
          colors: '#A3AED0',
          fontSize: '13px',
          fontWeight: '500',
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: true,
      labels: {
        style: {
          colors: '#A3AED0',
          fontSize: '13px',
          fontWeight: '500',
        },
      },
    },
    grid: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      heatmap: {
        colorScale: {
          ranges: [
            {
              from: -100,
              to: -8,
              color: '#ff0000',
              name: '-xl',
            },
            {
              from: -7,
              to: -6,
              color: '#ff3737',
              name: '-lg',
            },
            {
              from: -5,
              to: -4,
              color: '#ff6565',
              name: '-md',
            },
            {
              from: -3,
              to: -2,
              color: '#ff7171',
              name: '-sm',
            },
            {
              from: -1,
              to: -1,
              color: '#fd9393',
              name: '-xs',
            },
            {
              from: 0,
              to: 0,
              color: '#efefef',
              name: 'none',
            },
            {
              from: 1,
              to: 1,
              color: '#d5f8d1',
              name: 'xs',
            },
            {
              from: 2,
              to: 3,
              color: '#9afd91',
              name: 'sm',
            },
            {
              from: 4,
              to: 5,
              color: '#41e032',
              name: 'md',
            },
            {
              from: 6,
              to: 7,
              color: '#1dcb0e',
              name: 'lg',
            },
            {
              from: 8,
              to: 100,
              color: '#12b600',
              name: 'xl',
            },
          ],
        },
      },
    },
    theme: {
      palette: 'palette2',
    },
  }

  return (
    <Box
      backgroundColor="white"
      rounded="lg"
      p={4}
      pb={8}
      shadow="xl"
      width="100%"
      h="100%"
    >
      <Heading as="h3" fontSize="xl">
        コミット日時別のHeatMap
      </Heading>

      {/*
        NOTE: specify width to avoid error
        ref: https://github.com/apexcharts/apexcharts.js/issues/1898#issuecomment-1405848110
       */}
      <ReactApexChart
        options={options}
        series={series}
        type="heatmap"
        height="100%"
        width="100%"
      />
    </Box>
  )
}
