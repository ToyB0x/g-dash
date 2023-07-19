'use client'
import 'client-only'

import { FC } from 'react'
import { ApexOptions } from 'apexcharts'

// ref: https://github.com/apexcharts/react-apexcharts/issues/240
import dynamic from 'next/dynamic'
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })

type Props = {
  barChartSeries: {
    login: string
    committedDate: Date
  }[]
}

export const BarChart: FC<Props> = ({ barChartSeries }) => {
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
      categories: lastMonthDateStrings.map((dateString) =>
        new Date(dateString).getDate(),
      ),
      labels: {
        // show: false,
        style: {
          colors: '#A3AED0',
          fontSize: '14px',
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
        columnWidth: '10px',
      },
    },
    theme: {
      palette: 'palette2',
    },
  }

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="bar"
      height="100%"
      width="100%"
    />
  )
}
