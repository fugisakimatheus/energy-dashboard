'use client'

type CustomChartLegendData = {
  color: string
  value: string
}

type CustomChartLegendProps = {
  data: CustomChartLegendData[]
}

export default function CustomChartLegend(props: CustomChartLegendProps) {
  const { data } = props

  return (
    <ul
      data-testid="custom-chart-legend"
      className="flex flex-col sm:flex-row gap-1 sm:gap-0 items-end sm:items-center justify-end mb-6 sm:mb-4"
    >
      {data.map((entry, index) => (
        <li
          data-testid={entry.value}
          key={`item-${index}`}
          className="flex flex-row items-center text-[#6b7280] mr-[12px] font-medium text-sm"
        >
          <span
            className="inline-block w-[10px] h-[10px] rounded-full mr-[5px]"
            style={{ backgroundColor: entry.color }}
          ></span>
          {entry.value}
        </li>
      ))}
    </ul>
  )
}
