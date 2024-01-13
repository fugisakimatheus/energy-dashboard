import { capitalize } from './string'

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
  return ['2021', '2022']
}
