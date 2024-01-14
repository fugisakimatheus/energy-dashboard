import Card from '@/components/dump-components/card'
import ErrorBox from '@/components/dump-components/error-box'
import AnualConsumptionChartHeader from './header'

export default async function AnualConsumptionChartError() {
  return (
    <Card>
      <AnualConsumptionChartHeader />
      <ErrorBox height="330px" />
    </Card>
  )
}
