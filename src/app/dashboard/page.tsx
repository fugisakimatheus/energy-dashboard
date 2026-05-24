import DashboardHeader from '@/components/dashboard-header'
import AnualConsumptionChart from '@/components/wired-components/dashboard/charts/anual-consumption-chart'
import AnualConsumptionChartLoading from '@/components/wired-components/dashboard/charts/anual-consumption-chart/loading'
import HistoricalMeasurementChart from '@/components/wired-components/dashboard/charts/historical-measurement-chart'
import HistoricalMeasurementChartLoading from '@/components/wired-components/dashboard/charts/historical-measurement-chart/loading'
import HourlyMeasurementChart from '@/components/wired-components/dashboard/charts/hourly-measurement-chart'
import MeasurementsTable from '@/components/wired-components/dashboard/measurements-table'
import { Suspense } from 'react'

export default async function DashboardPage() {
  return (
    <div className="h-full w-full p-4 sm:p-6 md:p-10 lg:p-12">
      <DashboardHeader />

      <div className="flex w-full flex-col gap-5 sm:gap-6">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
          <Suspense fallback={<AnualConsumptionChartLoading />}>
            <AnualConsumptionChart />
          </Suspense>
          <HourlyMeasurementChart />
        </div>

        <Suspense fallback={<HistoricalMeasurementChartLoading />}>
          <HistoricalMeasurementChart />
        </Suspense>

        <MeasurementsTable />
      </div>
    </div>
  )
}
