import { subMonths, subWeeks } from 'date-fns'

const today = new Date()

export const Spans = {
  '1 week': subWeeks(today, 1).getTime(),
  '2 week': subWeeks(today, 2).getTime(),
  '1 month': subMonths(today, 1).getTime(),
  '3 month': subMonths(today, 3).getTime(),
  '6 month': subMonths(today, 6).getTime(),
} as const
