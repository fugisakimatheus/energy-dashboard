import Card from '@/components/dump-components/card'
import { MeasurementService } from '@/data/services/measurements-service'
import HistoricalMeasurementChartWrapper from './chart'

type LastWeekConsumptionChartData = {
  label: string
  value: number
}

export default async function HistoricalMeasurementChart() {
  const lastWeekMeasurements = await MeasurementService.search({
    filters: {
      year_lte: '2022',
      month_lte: '12',
      day_lte: '31',
      year_gte: '2022',
      month_gte: '12',
      day_gte: '24',
    },
  })

  const lastWeekData: LastWeekConsumptionChartData[] = lastWeekMeasurements.map(
    ({ day, month, consumption }) => ({
      label: `${day}/${month}`,
      value: consumption,
    }),
  )

  return (
    <Card>
      <div className="px-4 mb-4 flex flex-col">
        <span className="font-semibold text-lg text-[#374151]">
          Medição Histórica (Última Semana)
        </span>
      </div>

      <div className="w-full h-full max-h-[290px] px-2">
        <HistoricalMeasurementChartWrapper
          data={lastWeekData}
        ></HistoricalMeasurementChartWrapper>
      </div>
    </Card>
  )
}
