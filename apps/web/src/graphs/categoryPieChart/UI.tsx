'use client'
import 'client-only'

import { FC } from 'react'
import { ApexOptions } from 'apexcharts'
import ReactApexChart from 'react-apexcharts'
import { Box } from '@chakra-ui/react'

// windowエラーを消したい場合は以下のワークアラウンドが使えるがDynamicImportのため表示が1秒ほど遅くなる
// ref: https://github.com/apexcharts/react-apexcharts/issues/240
// import dynamic from 'next/dynamic'
// const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })

type Props = {
  prTitles: string[]
}

export const UI: FC<Props> = ({ prTitles }) => {
  const labelMaps = [
    { match: 'feat', display: '新機能' },
    { match: 'fix', display: 'バグ修正' },
    { match: 'refactor', display: 'リファクタ' },
    { match: 'test', display: 'テスト追加' },
    { match: 'perf', display: 'パフォーマンス改善' },
    { match: 'chore', display: '雑務' },
    { match: 'other', display: 'その他' },
  ]

  const getSeries = (titles: string[]) => {
    const series = [0, 0, 0, 0, 0, 0, 0]
    titles.forEach((title) => {
      const labelMap = labelMaps.find((labelMap) =>
        title.toLowerCase().startsWith(labelMap.match),
      )
      if (labelMap) {
        series[labelMaps.indexOf(labelMap)] += 1
      } else {
        series[6] += 1
      }
    })
    return series
  }

  const series = getSeries(prTitles)

  const options: ApexOptions = {
    chart: {
      width: 380,
      type: 'pie',
      animations: {
        enabled: false,
      },
    },
    labels: labelMaps.map((labelMap) => labelMap.display),
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
        type="pie"
        width="100%"
        height="100%"
      />
    </Box>
  )
}
