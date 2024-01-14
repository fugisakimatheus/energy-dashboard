import Card from '@/components/dump-components/card'
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
      <div className="px-4 mb-6 flex flex-col">
        <span className="font-semibold text-lg text-[#374151]">
          Consumo Anual ({lastYear} / {currentYear})
        </span>
        <span className="text-[#9CA3AF] font-medium">
          Comparativo mensal do consumo realizado nos anos de {lastYear} e{' '}
          {currentYear}.
        </span>
      </div>

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
