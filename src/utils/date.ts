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
