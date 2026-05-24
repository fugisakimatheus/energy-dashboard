'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export type ChartTheme = {
  grid: string
  text: string
  tooltipBg: string
  tooltipBorder: string
}

const lightChartTheme: ChartTheme = {
  grid: '#e2e8f0',
  text: '#64748b',
  tooltipBg: 'rgba(255, 255, 255, 0.96)',
  tooltipBorder: '#e2e8f0',
}

const darkChartTheme: ChartTheme = {
  grid: 'rgba(148, 163, 184, 0.1)',
  text: '#94a3b8',
  tooltipBg: 'rgba(18, 22, 32, 0.97)',
  tooltipBorder: 'rgba(56, 64, 80, 0.6)',
}

export function useChartTheme(): ChartTheme {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return darkChartTheme
  }

  return resolvedTheme === 'light' ? lightChartTheme : darkChartTheme
}
