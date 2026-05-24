'use client'

import ChartContainer from '@/components/dump-components/chart-container'
import { useChartTheme } from '@/hooks/use-chart-theme'
import { CHART_MARGIN, formatYAxisTick, Y_AXIS_WIDTH } from '@/utils/chart'
import { formatEnergy } from '@/utils/number'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
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
  const chartTheme = useChartTheme()

  const legendData = [
    { color: '#3C81F6', value: 'Consumo' },
    { color: '#F97414', value: 'Flex Máxima' },
    { color: '#6466F1', value: 'Flex Mínima' },
    { color: '#22C45D', value: 'Consumo Flat' },
  ]

  return (
    <ChartContainer height={320}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={CHART_MARGIN}>
          <CartesianGrid
            stroke={chartTheme.grid}
            strokeDasharray="3 3"
            vertical={false}
          />
          <XAxis
            dataKey="label"
            fontSize={11}
            tick={false}
            fontWeight="500"
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            width={Y_AXIS_WIDTH}
            tickFormatter={formatYAxisTick}
            tickMargin={4}
            domain={[90, 114]}
            fontSize={10}
            fontWeight="500"
            tickLine={false}
            axisLine={false}
            tick={{ fill: chartTheme.text }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: chartTheme.tooltipBg,
              borderColor: chartTheme.tooltipBorder,
              borderRadius: '12px',
              backdropFilter: 'blur(8px)',
            }}
            labelStyle={{ color: chartTheme.text }}
            formatter={(value: number) => [formatEnergy(value), 'Consumo']}
          />
          <Legend
            verticalAlign="top"
            align="right"
            content={<CustomChartLegend data={legendData} />}
          />

          <ReferenceLine
            y={maxFlex}
            stroke="#F97414"
            strokeWidth={1.5}
            strokeDasharray="4 4"
          />
          <ReferenceLine
            y={flatConsumption}
            stroke="#22C45D"
            strokeWidth={1.5}
            strokeDasharray="4 4"
          />
          <ReferenceLine
            y={minFlex}
            stroke="#6466F1"
            strokeWidth={1.5}
            strokeDasharray="4 4"
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#60A5FA"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: '#3C81F6' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
