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

type AnualConsumptionChartWrapperProps = {
  data: any[]
  lastYear: string
  currentYear: string
}

export default function AnualConsumptionChartWrapper(
  props: AnualConsumptionChartWrapperProps,
) {
  const { data, currentYear, lastYear } = props

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 4,
          bottom: 4,
          left: 20,
          right: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="label" fontSize={12} fontWeight="500" />
        <YAxis unit=" (MWh)" tickMargin={8} fontSize={12} fontWeight="500" />
        <Tooltip />
        <Legend
          verticalAlign="top"
          align="right"
          iconType="circle"
          iconSize={10}
        />
        <Bar
          name={lastYear}
          dataKey="lastYearValue"
          fill="#3C81F6"
          activeBar={<Rectangle fill="#3C81F6" stroke="black" />}
          maxBarSize={15}
        />
        <Bar
          name={currentYear}
          dataKey="currentYearValue"
          fill="#17B8A6"
          activeBar={<Rectangle fill="#17B8A6" stroke="black" />}
          maxBarSize={15}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
