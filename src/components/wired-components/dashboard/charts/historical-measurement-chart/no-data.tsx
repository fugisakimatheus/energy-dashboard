import Card from '@/components/dump-components/card'
import NoDataBox from '@/components/dump-components/no-data-box'
import HistoricalMeasurementChartHeader from './header'

export default async function HistoricalMeasurementChartNoData() {
  return (
    <Card>
      <HistoricalMeasurementChartHeader />
      <NoDataBox height="290px" />
    </Card>
  )
}
