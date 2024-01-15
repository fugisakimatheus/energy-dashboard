import { Measurement } from '@/data/models/measurement/measurement-model'

export const groupMeasurementsConsumptionByMonths = (data: Measurement[]) => {
  const consumptionsByMonth: Record<string, number> = {}

  data.forEach(({ year, month, consumption }) => {
    const key = `${year}-${month}`
    consumptionsByMonth[key] = (consumptionsByMonth[key] || 0) + consumption
  })

  return Object.entries(consumptionsByMonth).map(
    ([yearMonthKey, monthlyConsumptionTotal]) => {
      const [year, month] = yearMonthKey.split('-')
      return {
        year: parseInt(year),
        month: parseInt(month),
        monthlyConsumptionTotal,
      }
    },
  )
}
