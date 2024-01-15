'use client'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import CustomChartLegend from '../custom-chart-legend'

type HistoricalMeasurementChartWrapperProps = {
  data: any[]
}

export default function HistoricalMeasurementChartWrapper(
  props: HistoricalMeasurementChartWrapperProps,
) {
  const { data } = props

  const legendData = [{ color: '#6466F1', value: 'Consumo' }]

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart width={500} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="label"
          fontSize={12}
          fontWeight="500"
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          unit=" (MWh)"
          tickFormatter={value => Math.round(value).toString()}
          tickMargin={8}
          domain={[88, 120]}
          fontSize={12}
          fontWeight="500"
          tickLine={false}
          axisLine={false}
        />
        <Tooltip formatter={(value: number) => [`${value} MWh`, 'Consumo']} />
        <Legend
          verticalAlign="top"
          align="right"
          content={<CustomChartLegend data={legendData} />}
        />

        <defs>
          <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="15%" stopColor="#6466F1" stopOpacity={0.6} />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="linear"
          dataKey="value"
          stroke="#6466F1"
          strokeWidth={2}
          fill="url(#splitColor)"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
