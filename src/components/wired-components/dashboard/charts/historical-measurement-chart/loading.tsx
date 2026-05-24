'use client'

import Card from '@/components/dump-components/card'
import ChartContainer from '@/components/dump-components/chart-container'
import ChartLoading from '@/components/dump-components/chart-loading'

export default function HistoricalMeasurementChartLoading() {
  return (
    <Card>
      <div className="mb-5">
        <div className="skeleton-line h-5 w-[312px]" />
      </div>
      <ChartContainer height={300}>
        <div className="flex h-full items-end justify-center">
          <ChartLoading colsNumber={32} />
        </div>
      </ChartContainer>
    </Card>
  )
}
