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
      className="mb-2 flex flex-wrap justify-end gap-x-4 gap-y-1"
    >
      {data.map((entry, index) => (
        <li
          data-testid={entry.value}
          key={`item-${index}`}
          className="flex flex-row items-center text-xs font-medium text-muted-foreground"
        >
          <span
            className="mr-1.5 inline-block h-2 w-2 rounded-full"
            style={{ backgroundColor: entry.color }}
          ></span>
          {entry.value}
        </li>
      ))}
    </ul>
  )
}
