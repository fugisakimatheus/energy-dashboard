'use client'

import Card from '@/components/dump-components/card'
import ChartContainer from '@/components/dump-components/chart-container'
import ChartLoading from '@/components/dump-components/chart-loading'

export default function AnualConsumptionChartLoading() {
  return (
    <Card>
      <div className="mb-5 flex flex-col gap-2">
        <div className="skeleton-line h-5 w-[260px]" />
        <div className="skeleton-line h-4 w-full max-w-[520px]" />
      </div>
      <ChartContainer height={330}>
        <div className="flex h-full items-end justify-center">
          <ChartLoading colsNumber={15} />
        </div>
      </ChartContainer>
    </Card>
  )
}
