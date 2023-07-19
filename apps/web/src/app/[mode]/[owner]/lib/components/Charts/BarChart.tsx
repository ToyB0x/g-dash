'use client'
import 'client-only'

import { FC } from 'react'
import { ApexOptions } from 'apexcharts'

// ref: https://github.com/apexcharts/react-apexcharts/issues/240
import dynamic from 'next/dynamic'
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })

type Props = {
  barChartSeriesArray: {
    login: string
    commitsDates: Date[]
  }[]
}

export const BarChart: FC<Props> = ({ barChartSeriesArray }) => {
  const convertToCommitDailyCounts = (
    commits: { committedDate: Date; login: string }[],
  ): { name: string; data: number[] }[] => {
    const obj: {
      [login: string]: {
        [dateString: string]: number
      }
    } = {}

    const users = Array.from(new Set(commits.map((commit) => commit.login)))

    // init obj
    const dateStrings = Array.from(Array(365).keys()).map((i) => {
      const date = new Date()
      date.setDate(date.getDate() - i)
      return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
      ).toDateString()
    })

    users.forEach((user) => {
      obj[user] = {}
      dateStrings.forEach((dateString) => {
        obj[user][dateString] = 0
      })
    })

    const updateCount = (login: string, committedDate: Date) => {
      const dateString = new Date(
        committedDate.getFullYear(),
        committedDate.getMonth(),
        committedDate.getDate(),
      ).toDateString()

      if (obj[login][dateString]) {
        obj[login][dateString]++
      } else {
        obj[login][dateString] = 1
      }
    }

    commits.forEach((commit) => updateCount(commit.login, commit.committedDate))

    return Object.keys(obj).map((login) => ({
      name: login,
      data: Object.keys(obj[login])
        .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
        .slice(0, 31)
        .reverse()
        .map((dateString) => obj[login][dateString]),
    }))
  }

  const series = convertToCommitDailyCounts(
    barChartSeriesArray
      .map((s) =>
        s.commitsDates.map((date) => ({ committedDate: date, login: s.login })),
      )
      .flat(),
  )

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

  // NOTE: 以下は負荷が高いためオブジェクト利用で高速化
  // // NOTE: 以下はmap / filter部分が遅いので高速化が必要(1ユーザあたり1000コミット/月 * 100ユーザ * 31日 = 310万回のループ)
  // const series = barChartSeriesArray.map((s) => ({
  //   name: s.login,
  //   data: lastMonthDateStrings.map(
  //     (dateString) =>
  //       s.commitsDates.filter((commitDate) => {
  //         const date = new Date(dateString)
  //         return (
  //           commitDate.getFullYear() === date.getFullYear() &&
  //           commitDate.getMonth() === date.getMonth() &&
  //           commitDate.getDate() === date.getDate()
  //         )
  //       }).length,
  //   ),
  // }))

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
