import { formatEnergyValue } from './number'

export const CHART_MARGIN = {
  top: 12,
  right: 12,
  left: 4,
  bottom: 4,
} as const

export const Y_AXIS_WIDTH = 82

export const formatYAxisTick = (value: number) => formatEnergyValue(value)

export const getNiceMaxDomain = (values: number[], paddingRatio = 0.12) => {
  const max = Math.max(...values, 0)
  if (max === 0) return 100
  return Math.ceil(max * (1 + paddingRatio))
}
