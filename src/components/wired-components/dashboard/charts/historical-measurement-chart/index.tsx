import Card from '@/components/dump-components/card'
import { MeasurementService } from '@/data/services/measurements-service'
import HistoricalMeasurementChartWrapper from './chart'
import HistoricalMeasurementChartHeader from './header'
import HistoricalMeasurementChartError from './error'
import HistoricalMeasurementChartNoData from './no-data'

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

  if (typeof lastWeekMeasurements === 'string') {
    return <HistoricalMeasurementChartError />
  }

  if (lastWeekMeasurements.length === 0) {
    return <HistoricalMeasurementChartNoData />
  }

  const lastWeekData: LastWeekConsumptionChartData[] = lastWeekMeasurements.map(
    ({ day, month, consumption }) => ({
      label: `${day}/${month}`,
      value: consumption,
    }),
  )

  return (
    <Card>
      <HistoricalMeasurementChartHeader />

      <div className="w-full h-full max-h-[290px] px-2">
        <HistoricalMeasurementChartWrapper
          data={lastWeekData}
        ></HistoricalMeasurementChartWrapper>
      </div>
    </Card>
  )
}
