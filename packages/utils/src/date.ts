import { subMonths } from 'date-fns/subMonths'
import { subWeeks } from 'date-fns/subWeeks'
import { startOfMonth } from 'date-fns/startOfMonth'

const today = new Date()

export const Spans = {
  '1 week': subWeeks(today, 1).getTime(),
  '2 week': subWeeks(today, 2).getTime(),
  '1 month': subMonths(today, 1).getTime(),
  '2 month': subMonths(today, 2).getTime(),
  '3 month': subMonths(today, 3).getTime(),
  '6 month': subMonths(today, 6).getTime(),
  'start of month': startOfMonth(today).getTime(),
} as const
