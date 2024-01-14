import Card from '@/components/dump-components/card'
import ChartLoading from '@/components/dump-components/chart-loading'

export default async function HistoricalMeasurementChartLoading() {
  return (
    <Card>
      <div className="px-4 mb-4 flex flex-col">
        <div className="h-[14px] w-[312px] bg-gray-200"></div>
      </div>

      <div className="flex flex-row justify-center items-center w-full h-[290px] px-2">
        <ChartLoading colsNumber={32} />
      </div>
    </Card>
  )
}
