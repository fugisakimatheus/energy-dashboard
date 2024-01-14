import Card from '@/components/dump-components/card'
import NoDataBox from '@/components/dump-components/no-data-box'
import AnualConsumptionChartHeader from './header'

export default async function AnualConsumptionChartNoData() {
  return (
    <Card>
      <AnualConsumptionChartHeader />
      <NoDataBox height="330px" />
    </Card>
  )
}
