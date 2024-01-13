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
    <HistoricalMeasurementChartWrapper
      data={lastWeekData}
    ></HistoricalMeasurementChartWrapper>
  )
}
