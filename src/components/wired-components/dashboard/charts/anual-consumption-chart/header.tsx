import SectionHeader from '@/components/dump-components/section-header'

export default function AnualConsumptionChartHeader() {
  const lastYear = '2021'
  const currentYear = '2022'

  return (
    <SectionHeader
      title={`Consumo Anual (${lastYear} / ${currentYear})`}
      description={`Comparativo mensal do consumo realizado nos anos de ${lastYear} e ${currentYear}.`}
    />
  )
}
