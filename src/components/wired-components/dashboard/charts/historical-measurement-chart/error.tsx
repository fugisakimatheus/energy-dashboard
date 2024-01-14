import Card from '@/components/dump-components/card'
import ErrorBox from '@/components/dump-components/error-box'
import HistoricalMeasurementChartHeader from './header'

export default async function HistoricalMeasurementChartError() {
  return (
    <Card>
      <HistoricalMeasurementChartHeader />
      <ErrorBox height="290px" />
    </Card>
  )
}
