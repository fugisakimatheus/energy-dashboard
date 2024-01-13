'use client'
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import CustomChartLegend from '../custom-chart-legend'

type AnualConsumptionChartWrapperProps = {
  data: any[]
  lastYear: string
  currentYear: string
}

export default function AnualConsumptionChartWrapper(
  props: AnualConsumptionChartWrapperProps,
) {
  const { data, currentYear, lastYear } = props

  const legendData = [
    { color: '#3C81F6', value: '2021' },
    { color: '#22C45D', value: '2022' },
  ]

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="label"
          fontSize={12}
          fontWeight="500"
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          domain={[0, 120]}
          unit=" (MWh)"
          tickMargin={8}
          fontSize={12}
          fontWeight="500"
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          formatter={(value: number, label) => [`${value} MWh`, label]}
        />
        <Legend
          verticalAlign="top"
          align="right"
          content={<CustomChartLegend data={legendData} />}
        />

        <Bar
          name={lastYear}
          dataKey="lastYearValue"
          fill="#3C81F6"
          activeBar={<Rectangle fill="#639fff" stroke="black" />}
          maxBarSize={20}
        />
        <Bar
          name={currentYear}
          dataKey="currentYearValue"
          fill="#17B8A6"
          activeBar={<Rectangle fill="#20dbc5" stroke="black" />}
          maxBarSize={20}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
