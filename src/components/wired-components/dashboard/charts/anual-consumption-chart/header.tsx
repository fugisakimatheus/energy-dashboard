export default async function AnualConsumptionChartHeader() {
  const lastYear = '2021'
  const currentYear = '2022'

  return (
    <div className="px-4 mb-6 flex flex-col">
      <span className="font-semibold text-lg text-[#374151]">
        Consumo Anual ({lastYear} / {currentYear})
      </span>
      <span className="text-[#9CA3AF] font-medium">
        Comparativo mensal do consumo realizado nos anos de {lastYear} e{' '}
        {currentYear}.
      </span>
    </div>
  )
}
