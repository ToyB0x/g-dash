'use client'
import 'client-only'
import { ApexOptions } from 'apexcharts'

import { FC } from 'react'
// ref: https://github.com/apexcharts/react-apexcharts/issues/240
import dynamic from 'next/dynamic'
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })

type Props = {
  lineChartSeries: {
    [dateString: string]: {
      open: number
      merged: number
      review: number
    }
  }
}

export const LineChart: FC<Props> = ({ lineChartSeries }) => {
  // get last 30 days
  const lastWeekDateStrings = Object.keys(lineChartSeries)
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
    .slice(0, 31)
    .reverse()

  const getDates = () => {
    return lastWeekDateStrings.map((dateString) => {
      const date = new Date(dateString)
      return date.getDate()
    })
  }

  const series = [
    {
      name: 'PR: Open',
      data: lastWeekDateStrings.map(
        (dateString) => lineChartSeries[dateString].open,
      ),
    },
    {
      name: 'PR: Merged',
      data: lastWeekDateStrings.map(
        (dateString) => lineChartSeries[dateString].merged,
      ),
    },
    {
      name: 'Review',
      data: lastWeekDateStrings.map(
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
      categories: getDates(),
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
    chart: {
      toolbar: {
        show: false,
      },
    },
  }

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="line"
      height="100%"
      width="100%"
    />
  )
}
