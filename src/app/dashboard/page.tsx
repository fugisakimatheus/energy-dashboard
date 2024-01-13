import AnualConsumptionChart from '@/components/wired-components/dashboard/charts/anual-consumption-chart'
import HistoricalMeasurementChart from '@/components/wired-components/dashboard/charts/historical-measurement-chart'
import HourlyMeasurementChart from '@/components/wired-components/dashboard/charts/hourly-measurement-chart'
import MeasurementsTable from '@/components/wired-components/dashboard/measurements-table'

export default async function Home() {
  return (
    <div className="w-full h-full p-3 sm:p-6 md:p-12">
      <div className="flex flex-col mb-8">
        <span className="font-semibold text-lg text-[#374151]">Dashboard</span>
        <span className="text-[#6E7582] font-medium">
          Informações baseadas nos dados de medições colhidos na CCEE.
        </span>
      </div>

      <div className="w-full h-full flex flex-col gap-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-1/2">
            <AnualConsumptionChart />
          </div>
          <div className="w-full lg:w-1/2">
            <HourlyMeasurementChart />
          </div>
        </div>

        <HistoricalMeasurementChart />

        <MeasurementsTable />
      </div>
    </div>
  )
}
