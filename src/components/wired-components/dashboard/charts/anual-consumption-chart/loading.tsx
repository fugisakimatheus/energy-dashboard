'use client'

import Card from '@/components/dump-components/card'
import ChartLoading from '@/components/dump-components/chart-loading'

export default function AnualConsumptionChartLoading() {
  return (
    <Card>
      <div className="px-4 mb-6 flex flex-col gap-4 animate-pulse">
        <div className="h-[14px] w-[260px] bg-gray-200"></div>
        <div className="h-[14px] w-full bg-gray-200"></div>
        <div className="h-[14px] w-[80px] bg-gray-200"></div>
      </div>

      <div className="flex flex-row justify-center items-center w-full h-[330px] px-2">
        <ChartLoading colsNumber={15} />
      </div>
    </Card>
  )
}
