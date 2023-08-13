'use client'
import 'client-only'
import { ApexOptions } from 'apexcharts'

import { FC } from 'react'
import { Box } from '@chakra-ui/react'
import ReactApexChart from 'react-apexcharts'

// windowエラーを消したい場合は以下のワークアラウンドが使えるがDynamicImportのため表示が1秒ほど遅くなる
// ref: https://github.com/apexcharts/react-apexcharts/issues/240
// import dynamic from 'next/dynamic'
// const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })

type Props = {
  lineChartSeries: {
    [dateString: string]: {
      open: number
      merged: number
      review: number
    }
  }
}

export const UI: FC<Props> = ({ lineChartSeries }) => {
  // NOTE: gedDateでは1/1と2/1が重複してカウントされてしまうため0時の時点の日付文字を利用
  const lastMonthDateStrings = Array.from(Array(31).keys())
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

  const series = [
    {
      name: 'PR: Open',
      data: lastMonthDateStrings.map(
        (dateString) => lineChartSeries[dateString].open,
      ),
    },
    {
      name: 'PR: Merged',
      data: lastMonthDateStrings.map(
        (dateString) => lineChartSeries[dateString].merged,
      ),
    },
    {
      name: 'Review',
      data: lastMonthDateStrings.map(
        (dateString) => lineChartSeries[dateString].review,
      ),
    },
  ]

  const options: ApexOptions = {
    colors: ['#4318FF', '#39a3de', '#21d908'],
    stroke: {
      curve: 'smooth',
    },
    grid: {
      show: false,
    },
    xaxis: {
      categories: lastMonthDateStrings.map((dateString) => {
        const date = new Date(dateString)
        if (date.getDay() === 0 || date.getDay() === 6)
          return `(${date.getMonth() + 1 + '/' + date.getDate()})`
        return date.getMonth() + 1 + '/' + date.getDate()
      }),
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        rotateAlways: true,
        style: {
          colors: '#A3AED0',
          fontSize: '10px',
          fontWeight: '500',
        },
      },
    },
    yaxis: {
      show: false,
    },
    chart: {
      animations: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
  }

  return (
    <Box
      backgroundColor="white"
      rounded="lg"
      p={4}
      shadow="xl"
      width="100%"
      h="100%"
    >
      {/*
        NOTE: specify width to avoid error
        ref: https://github.com/apexcharts/apexcharts.js/issues/1898#issuecomment-1405848110
       */}
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height="100%"
        width="100%"
      />
    </Box>
  )
}
