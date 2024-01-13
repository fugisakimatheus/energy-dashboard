import { Measurement } from '@/data/models/measurement/measurement-model'

type MonthGroupedMeasurement = {
  month: number
  year: number
  monthlyConsumptionTotal: number
}

export const groupMeasurementsConsumptionByMonths = (data: Measurement[]) => {
  return data.reduce<MonthGroupedMeasurement[]>((list, measurement) => {
    const index = list.findIndex(item => item.month === measurement.month)
    if (index === -1) {
      list.push({
        month: measurement.month,
        year: measurement.year,
        monthlyConsumptionTotal: measurement.consumption,
      })
      return list
    }
    list[index].monthlyConsumptionTotal += measurement.consumption
    return list
  }, [])
}
