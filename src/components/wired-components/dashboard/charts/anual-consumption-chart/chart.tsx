'use client'

import ChartContainer from '@/components/dump-components/chart-container'
import { useChartTheme } from '@/hooks/use-chart-theme'
import {
  CHART_MARGIN,
  formatYAxisTick,
  getNiceMaxDomain,
  Y_AXIS_WIDTH,
} from '@/utils/chart'
import { formatChartTooltipEnergy } from '@/utils/number'
import { useMemo } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
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
  const chartTheme = useChartTheme()

  const yMax = useMemo(
    () =>
      getNiceMaxDomain(
        data.flatMap((item: { lastYearValue: number; currentYearValue: number }) => [
          item.lastYearValue,
          item.currentYearValue,
        ]),
      ),
    [data],
  )

  const legendData = [
    { color: '#3C81F6', value: '2021' },
    { color: '#17B8A6', value: '2022' },
  ]

  return (
    <ChartContainer height={330}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={CHART_MARGIN}>
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
            domain={[0, yMax]}
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
            formatter={(value: number, label) =>
              formatChartTooltipEnergy(value, String(label))
            }
          />
          <Legend
            verticalAlign="top"
            align="right"
            content={<CustomChartLegend data={legendData} />}
          />

          <defs>
            <linearGradient id="barBlue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#60A5FA" />
              <stop offset="100%" stopColor="#3C81F6" />
            </linearGradient>
            <linearGradient id="barTeal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2DD4BF" />
              <stop offset="100%" stopColor="#17B8A6" />
            </linearGradient>
          </defs>

          <Bar
            name={lastYear}
            dataKey="lastYearValue"
            fill="url(#barBlue)"
            activeBar={<Rectangle fill="#93C5FD" stroke="transparent" />}
            maxBarSize={22}
            radius={[4, 4, 0, 0]}
          />
          <Bar
            name={currentYear}
            dataKey="currentYearValue"
            fill="url(#barTeal)"
            activeBar={<Rectangle fill="#5EEAD4" stroke="transparent" />}
            maxBarSize={22}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
