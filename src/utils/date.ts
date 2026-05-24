import { capitalize } from './string'

export const MEASUREMENT_YEARS = [2021, 2022] as const

export const DEFAULT_MEASUREMENT_DATE = new Date(2022, 11, 31)

export const getMonthName = (monthNumber: number) => {
  const date = new Date()
  date.setMonth(monthNumber - 1)
  const monthName = date.toLocaleString('pt-BR', { month: 'long' }).slice(0, 3)
  return capitalize(monthName)
}

export const generateMonthNumbers = () => {
  return Array.from({ length: 12 }, (_, index) => index + 1)
}

export const generateMonthDays = () => {
  return Array.from({ length: 31 }, (_, index) => index + 1).map(day =>
    String(day),
  )
}

export const generateMonthsWithNames = () => {
  return generateMonthNumbers().map(monthNumber => ({
    monthNumber: String(monthNumber),
    monthName: getMonthName(monthNumber),
  }))
}

export const getAvailableYears = () => {
  return MEASUREMENT_YEARS.map(String)
}

export const isAllowedMeasurementDate = (date: Date) => {
  return MEASUREMENT_YEARS.includes(
    date.getFullYear() as (typeof MEASUREMENT_YEARS)[number],
  )
}

export const dateToMeasurementParts = (date: Date) => ({
  day: String(date.getDate()),
  month: String(date.getMonth() + 1),
  year: String(date.getFullYear()),
})

export const shiftMeasurementDate = (date: Date, days: number): Date | null => {
  const next = new Date(date)
  next.setDate(next.getDate() + days)

  if (!isAllowedMeasurementDate(next)) {
    return null
  }

  return next
}
