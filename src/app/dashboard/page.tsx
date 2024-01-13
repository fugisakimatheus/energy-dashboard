import AnualConsumptionChart from '@/components/dashboard/charts/anual-consumption-chart'
import HistoricalMeasurementChart from '@/components/dashboard/charts/historical-measurement-chart'

export default async function Home() {
  return (
    <div className="w-full h-full">
      <div className="w-full h-full max-h-[300px] mb-28">
        <HistoricalMeasurementChart />
      </div>
      <div className="w-full h-full max-h-[400px] max-w-[600px]">
        <AnualConsumptionChart />
      </div>
    </div>
  )
}
