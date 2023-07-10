'use client'
import 'client-only'

import { ApexOptions } from 'apexcharts'
import { FC } from 'react'
// ref: https://github.com/apexcharts/react-apexcharts/issues/240
import dynamic from 'next/dynamic'
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })

type Props = {
  barChartSeries: {
    [login: string]: {
      [dateString: string]: number
    }
  }
}

export const BarChart: FC<Props> = ({ barChartSeries }) => {
  // TODO: refactor
  const someLoginName = Object.keys(barChartSeries)[0]
  console.log({ someLoginName })
  const _lastMonthDateStrings = Object.keys(barChartSeries[someLoginName])
  const lastMonthDateStrings = _lastMonthDateStrings
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
    .slice(0, 31)
    .reverse()

  const getDates = () => {
    return lastMonthDateStrings.map((dateString) => {
      const date = new Date(dateString)
      return date.getDate()
    })
  }

  const series = Object.keys(barChartSeries).map((login) => ({
    name: login,
    data: Object.keys(barChartSeries[login])
      .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
      .slice(0, 31)
      .reverse()
      .map((dateString) => barChartSeries[login][dateString]),
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
      categories: getDates(),
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
