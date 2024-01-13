import { Measurement } from '@/data/models/measurement/measurement-model'

type MonthGroupedMeasurement = {
  month: number
  year: number
  monthlyConsumptionTotal: number
}

export const groupMeasurementsConsumptionByMonths = (data: Measurement[]) => {
  // TODO: Trabalhar em cima dos dados, das medições diárias
  return data.reduce<MonthGroupedMeasurement[]>((list, measurement) => {
    list.push({
      month: measurement.month,
      year: measurement.year,
      monthlyConsumptionTotal: measurement.consumption,
    })
    return list
  }, [])
}
