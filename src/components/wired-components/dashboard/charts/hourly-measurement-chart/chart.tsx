'use client'
import {
  LineChart,
  Line,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
} from 'recharts'
import CustomChartLegend from '../custom-chart-legend'

type HourlyMeasurementChartWrapperProps = {
  data: any[]
  maxFlex: number
  minFlex: number
  flatConsumption: number
}

export default function HourlyMeasurementChartWrapper(
  props: HourlyMeasurementChartWrapperProps,
) {
  const { data, maxFlex, minFlex, flatConsumption } = props

  const legendData = [
    { color: '#3C81F6', value: 'Consumo' },
    { color: '#F97414', value: 'Flex Máxima' },
    { color: '#6466F1', value: 'Flex Mínima' },
    { color: '#22C45D', value: 'Consumo Flat' },
  ]

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="label"
          fontSize={12}
          tick={false}
          fontWeight="500"
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          unit=" (MWh)"
          tickFormatter={value => Math.round(value).toString()}
          tickMargin={8}
          domain={[90, 114]}
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

        <ReferenceLine y={maxFlex} stroke="#F97414" strokeWidth={2} />
        <ReferenceLine y={flatConsumption} stroke="#22C45D" strokeWidth={2} />
        <ReferenceLine y={minFlex} stroke="#6466F1" strokeWidth={2} />
        <Line
          type="linear"
          dataKey="value"
          stroke="#3C81F6"
          strokeWidth={2}
          dot={<></>}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
