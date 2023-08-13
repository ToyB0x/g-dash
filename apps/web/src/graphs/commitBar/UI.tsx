'use client'
import 'client-only'

import { FC } from 'react'
import { Box } from '@chakra-ui/react'
import { ApexOptions } from 'apexcharts'
import ReactApexChart from 'react-apexcharts'

// windowエラーを消したい場合は以下のワークアラウンドが使えるがDynamicImportのため表示が1秒ほど遅くなる
// ref: https://github.com/apexcharts/react-apexcharts/issues/240
// import dynamic from 'next/dynamic'
// const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })

type Props = {
  barChartSeries: {
    login: string
    committedDate: Date
  }[]
}

export const UI: FC<Props> = ({ barChartSeries }) => {
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

  const users = Array.from(
    new Set(barChartSeries.map((commit) => commit.login)),
  )
  const series = users.map((u) => ({
    name: u,
    data: barChartSeries
      .filter((s) => s.login === u)
      .reduce<number[]>(
        (acc, cur) => {
          const dateString = new Date(
            cur.committedDate.getFullYear(),
            cur.committedDate.getMonth(),
            cur.committedDate.getDate(),
          ).toDateString()
          const index = lastMonthDateStrings.indexOf(dateString)
          acc[index]++
          return acc
        },
        Array.from(Array(lastMonthDateStrings.length).keys()).fill(0),
      ),
  }))

  const options: ApexOptions = {
    chart: {
      animations: {
        enabled: false,
      },
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    legend: {
      show: false,
    },
    xaxis: {
      // categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      categories: lastMonthDateStrings.map((dateString) => {
        const date = new Date(dateString)
        if (date.getDay() === 0 || date.getDay() === 6)
          return `(${date.getMonth() + 1 + '/' + date.getDate()})`
        return date.getMonth() + 1 + '/' + date.getDate()
      }),
      labels: {
        // show: false,
        style: {
          colors: '#A3AED0',
          fontSize: '10px',
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
      show: false,
    },
    grid: {
      show: false,
    },
    // colors: ['#5E37FF', '#6AD2FF', '#E1E9F8'],
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        columnWidth: '8px',
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
        type="bar"
        height="100%"
        width="100%"
      />
    </Box>
  )
}
