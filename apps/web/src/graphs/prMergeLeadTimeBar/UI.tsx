'use client'
import 'client-only'

import { FC } from 'react'
import { Box, Heading, Stack } from '@chakra-ui/react'
import { ApexOptions } from 'apexcharts'
import ReactApexChart from 'react-apexcharts'

// windowエラーを消したい場合は以下のワークアラウンドが使えるがDynamicImportのため表示が1秒ほど遅くなる
// ref: https://github.com/apexcharts/react-apexcharts/issues/240
// import dynamic from 'next/dynamic'
// const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })

type Props = {
  barChartSeries: {
    [range: string]: number
  }
}

export const UI: FC<Props> = ({ barChartSeries }) => {
  const series = [
    {
      name: 'value',
      data: Object.entries(barChartSeries).map(([key, value]) => ({
        x: key,
        y: value,
      })),
    },
  ]

  const options: ApexOptions = {
    chart: {
      animations: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    legend: {
      show: false,
    },
    xaxis: {
      labels: {
        style: {
          colors: '#A3AED0',
          fontSize: '12px',
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
    },
    grid: {
      show: false,
    },
    colors: ['#573ec0'],
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        columnWidth: 50 + 'px',
      },
    },
    theme: {
      palette: 'palette2',
    },
  }

  return (
    <Stack
      backgroundColor="white"
      rounded="lg"
      p={4}
      shadow="xl"
      width="100%"
      h="100%"
    >
      <Heading as="h3" fontSize="xl">
        マージ迄のリードタイム
      </Heading>
      <Box h="100%">
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
    </Stack>
  )
}
