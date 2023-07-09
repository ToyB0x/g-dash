'use client'
import 'client-only'
import { ApexOptions } from 'apexcharts'

// ref: https://github.com/apexcharts/react-apexcharts/issues/240
import dynamic from 'next/dynamic'
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })

export const LineChart = () => {
  const series = [
    {
      name: 'Revenue',
      data: [50, 64, 48, 66, 49, 68, 68],
    },
    {
      name: 'Profit',
      data: [30, 40, 24, 46, 20, 46, 46],
    },
  ]

  const options: ApexOptions = {
    colors: ['#4318FF', '#39B8FF'],
    stroke: {
      curve: 'smooth',
    },
    grid: {
      show: false,
    },
    xaxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
