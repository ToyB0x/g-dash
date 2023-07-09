'use client'
import 'client-only'

import { ApexOptions } from 'apexcharts'
import { FC } from 'react'
// ref: https://github.com/apexcharts/react-apexcharts/issues/240
import dynamic from 'next/dynamic'
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })

type Props = {
  barChartSeries: {
    [dateString: string]: number
  }
}

export const BarChart: FC<Props> = ({ barChartSeries }) => {
  const lastMonthDateStrings = Object.keys(barChartSeries)
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
    .slice(0, 31)
    .reverse()

  const getDates = () => {
    return lastMonthDateStrings.map((dateString) => {
      const date = new Date(dateString)
      return date.getDate()
    })
  }

  const series = [
    {
      name: 'Commits',
      data: lastMonthDateStrings.map(
        (dateString) => barChartSeries[dateString],
      ),
    },
    // {
    //   name: 'PRODUCT B',
    //   data: [400, 370, 330, 390, 320, 350, 360],
    // },
    // {
    //   name: 'PRODUCT C',
    //   data: [400, 370, 330, 390, 320, 350, 360],
    // },
  ]

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
        borderRadius: 5,
        columnWidth: '10px',
      },
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
