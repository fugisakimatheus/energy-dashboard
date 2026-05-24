'use client'

import { useMemo } from 'react'

type ChartLoadingProps = {
  colsNumber: number
}

export default function ChartLoading(props: ChartLoadingProps) {
  const { colsNumber } = props

  const barHeights = useMemo(
    () =>
      Array.from({ length: colsNumber }, () => {
        const randomNumber = Math.random()
        return Math.round(90 + randomNumber * (240 - 90))
      }),
    [colsNumber],
  )

  const getClassByColumnNumber = (value: number) => {
    if (value > 14) return 'hidden md:block'
    return ''
  }

  return (
    <div
      data-testid="chart-loading"
      className="skeleton-chart flex w-full flex-row items-end justify-center gap-4"
    >
      {barHeights.map((height, index) => (
        <div
          data-testid="chart-bar"
          key={index}
          style={{ height: `${height}px` }}
          className={`${getClassByColumnNumber(
            index + 1,
          )} skeleton-block w-[15px]`}
        />
      ))}
    </div>
  )
}
