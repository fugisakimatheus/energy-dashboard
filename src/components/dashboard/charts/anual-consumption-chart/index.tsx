import { MeasurementService } from '@/data/services/measurements-service'
import { generateMonthNumbers, getMonthName } from '@/utils/date'
import { groupMeasurementsConsumptionByMonths } from '@/utils/measurement'
import AnualConsumptionChartWrapper from './chart'

type AnualConsumptionChartData = {
  label: string
  lastYear: string
  currentYear: string
  lastYearValue: number
  currentYearValue: number
}

export default async function AnualConsumptionChart() {
  const lastYear = '2021'
  const currentYear = '2022'

  const lastYearMeasurements = await MeasurementService.search(
    { filters: { year: lastYear } },
    { cache: 'no-store' },
  )

  const currentYearMeasurements = await MeasurementService.search(
    { filters: { year: currentYear } },
    { cache: 'no-store' },
  )

  const lastYearMonthConsumptions =
    groupMeasurementsConsumptionByMonths(lastYearMeasurements)

  const currentYearMonthConsumption = groupMeasurementsConsumptionByMonths(
    currentYearMeasurements,
  )

  const anualData = generateMonthNumbers().reduce<AnualConsumptionChartData[]>(
    (list, month) => {
      const lastYearMonth = lastYearMonthConsumptions.find(
        measurement => measurement.month === month,
      )
      const currentYearMonth = currentYearMonthConsumption.find(
        measurement => measurement.month === month,
      )

      list.push({
        label: getMonthName(month),
        lastYear,
        currentYear,
        lastYearValue: lastYearMonth?.monthlyConsumptionTotal ?? 0,
        currentYearValue: currentYearMonth?.monthlyConsumptionTotal ?? 0,
      })

      return list
    },
    [],
  )

  return (
    <AnualConsumptionChartWrapper
      data={anualData}
      lastYear={lastYear}
      currentYear={currentYear}
    />
  )
}
