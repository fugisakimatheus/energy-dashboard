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

type HistoricalMeasurementChartWrapperProps = {
  data: any[]
}

export default function HistoricalMeasurementChartWrapper(
  props: HistoricalMeasurementChartWrapperProps,
) {
  const { data } = props

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 20,
          right: 35,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="label" fontSize={12} fontWeight="500" />
        <YAxis unit=" (MWh)" tickMargin={8} fontSize={12} fontWeight="500" />
        <Tooltip />
        <Legend
          formatter={() => 'Consumo'}
          verticalAlign="top"
          align="right"
          iconType="circle"
          iconSize={10}
        />
        <defs>
          <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#6466F1" stopOpacity={0.5} />
            <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="value"
          stroke="#6466F1"
          strokeWidth={2}
          fill="url(#splitColor)"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
