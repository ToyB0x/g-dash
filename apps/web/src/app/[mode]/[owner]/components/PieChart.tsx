'use client'
import 'client-only'
import { ApexOptions } from 'apexcharts'

// ref: https://github.com/apexcharts/react-apexcharts/issues/240
import dynamic from 'next/dynamic'
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })

export const PieChart = () => {
  const series = [44, 55, 13, 43, 22]

  const options: ApexOptions = {
    chart: {
      width: 380,
      type: 'pie',
    },
    labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  }

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="pie"
      width={'100%'}
      height={280}
    />
  )
}
