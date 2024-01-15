import Card from '@/components/dump-components/card'
import { GetMeasurementsSort } from '@/data/models/measurement/measurement-request-model'
import { MeasurementService } from '@/data/services/measurements-service'
import { generateMonthNumbers, getMonthName } from '@/utils/date'
import { groupMeasurementsConsumptionByMonths } from '@/utils/measurement'
import AnualConsumptionChartWrapper from './chart'
import AnualConsumptionChartError from './error'
import AnualConsumptionChartHeader from './header'
import AnualConsumptionChartNoData from './no-data'

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

  const sorts: GetMeasurementsSort[] = [
    { field: 'day', direction: 'asc' },
    { field: 'month', direction: 'asc' },
  ]

  const lastYearMeasurements = await MeasurementService.search(
    { filters: { year: lastYear }, sorts },
    { cache: 'no-store' },
  )

  const currentYearMeasurements = await MeasurementService.search(
    { filters: { year: currentYear }, sorts },
    { cache: 'no-store' },
  )

  if (
    typeof lastYearMeasurements === 'string' ||
    typeof currentYearMeasurements === 'string'
  ) {
    return <AnualConsumptionChartError />
  }

  if (
    lastYearMeasurements.length === 0 &&
    currentYearMeasurements.length === 0
  ) {
    return <AnualConsumptionChartNoData />
  }

  const lastYearConsumptions =
    groupMeasurementsConsumptionByMonths(lastYearMeasurements)

  const currentYearConsumption = groupMeasurementsConsumptionByMonths(
    currentYearMeasurements,
  )

  const anualData = generateMonthNumbers().reduce<AnualConsumptionChartData[]>(
    (list, month) => {
      const lastYearMonth = lastYearConsumptions.find(
        measurement => measurement.month === month,
      )
      const currentYearMonth = currentYearConsumption.find(
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
    <Card>
      <AnualConsumptionChartHeader />

      <div className="w-full h-full max-h-[330px] px-2">
        <AnualConsumptionChartWrapper
          data={anualData}
          lastYear={lastYear}
          currentYear={currentYear}
        />
      </div>
    </Card>
  )
}
