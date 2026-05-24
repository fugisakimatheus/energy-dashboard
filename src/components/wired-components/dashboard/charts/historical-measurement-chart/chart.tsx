'use client'

import ChartContainer from '@/components/dump-components/chart-container'
import { useChartTheme } from '@/hooks/use-chart-theme'
import {
  CHART_MARGIN,
  formatYAxisTick,
  getNiceMaxDomain,
  Y_AXIS_WIDTH,
} from '@/utils/chart'
import { formatEnergy } from '@/utils/number'
import { useMemo } from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import CustomChartLegend from '../custom-chart-legend'

type HistoricalMeasurementChartWrapperProps = {
  data: any[]
}

export default function HistoricalMeasurementChartWrapper(
  props: HistoricalMeasurementChartWrapperProps,
) {
  const { data } = props
  const chartTheme = useChartTheme()

  const [yMin, yMax] = useMemo(() => {
    const values = data.map((item: { value: number }) => item.value)
    const min = Math.min(...values)
    const max = Math.max(...values)
    const padding = (max - min) * 0.08 || 4
    return [
      Math.floor(Math.max(0, min - padding)),
      Math.ceil(max + padding),
    ]
  }, [data])

  const legendData = [{ color: '#6466F1', value: 'Consumo' }]

  return (
    <ChartContainer height={300}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={CHART_MARGIN}>
          <CartesianGrid
            stroke={chartTheme.grid}
            strokeDasharray="3 3"
            vertical={false}
          />
          <XAxis
            dataKey="label"
            fontSize={11}
            fontWeight="500"
            tickLine={false}
            axisLine={false}
            tick={{ fill: chartTheme.text }}
            dy={8}
          />
          <YAxis
            width={Y_AXIS_WIDTH}
            domain={[yMin, yMax]}
            tickFormatter={formatYAxisTick}
            tickMargin={4}
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

          <defs>
            <linearGradient id="areaIndigo" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6466F1" stopOpacity={0.45} />
              <stop offset="95%" stopColor="#6466F1" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="value"
            stroke="#818CF8"
            strokeWidth={2}
            fill="url(#areaIndigo)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
