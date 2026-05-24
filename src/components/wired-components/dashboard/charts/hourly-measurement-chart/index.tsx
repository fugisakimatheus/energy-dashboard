'use client'

import Card from '@/components/dump-components/card'
import ChartLoading from '@/components/dump-components/chart-loading'
import ErrorBox from '@/components/dump-components/error-box'
import NoDataBox from '@/components/dump-components/no-data-box'
import { useMeasurementStore } from '@/store/measurement-store'
import {
  dateToMeasurementParts,
  DEFAULT_MEASUREMENT_DATE,
} from '@/utils/date'
import { useCallback, useEffect, useState } from 'react'
import HourlyMeasurementChartWrapper from './chart'
import HourlyMeasurementChartHeader from './header'
import HourlyPeriodFilter from './period-filter'

const CHART_AREA_HEIGHT = 320

export default function HourlyMeasurementChart() {
  const [selectedDate, setSelectedDate] = useState(DEFAULT_MEASUREMENT_DATE)

  const getHourlyMeasurements = useMeasurementStore(
    state => state.getHourlyMeasurements,
  )
  const status = useMeasurementStore(state => state.hourlyMeasurementsStatus)
  const hourlyMeasurements = useMeasurementStore(
    state => state.hourlyMeasurements.data,
  )

  const isLoading = status === 'loading' || status === 'pristine'
  const isError = status === 'error'
  const isSuccess = status === 'success'
  const hasData = hourlyMeasurements.length > 0

  const fetchForDate = useCallback(
    (date: Date) => {
      const { day, month, year } = dateToMeasurementParts(date)
      getHourlyMeasurements(day, month, year)
    },
    [getHourlyMeasurements],
  )

  useEffect(() => {
    fetchForDate(selectedDate)
  }, [fetchForDate, selectedDate])

  const handleDateChange = (date: Date) => {
    setSelectedDate(date)
  }

  const hourlyData = hourlyMeasurements.map(measurement => ({
    label: `${measurement.day}/${measurement.month} às ${measurement.hour}h`,
    value: measurement.consumption,
  }))

  const renderChart = () => {
    if (isLoading) {
      return (
        <div
          className="flex w-full items-end justify-center px-2"
          style={{ height: CHART_AREA_HEIGHT }}
        >
          <ChartLoading colsNumber={15} />
        </div>
      )
    }
    if (isError) {
      return (
        <ErrorBox
          height={CHART_AREA_HEIGHT}
          onRetry={() => fetchForDate(selectedDate)}
        />
      )
    }
    if (!hasData && isSuccess) {
      return <NoDataBox height={CHART_AREA_HEIGHT} />
    }
    return (
      <HourlyMeasurementChartWrapper
        maxFlex={110}
        minFlex={90}
        flatConsumption={100}
        data={hourlyData}
      />
    )
  }

  return (
    <Card>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <HourlyMeasurementChartHeader />
        <HourlyPeriodFilter
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
          isLoading={isLoading}
        />
      </div>

      <div className={isLoading ? 'opacity-60 transition-opacity' : ''}>
        {renderChart()}
      </div>
    </Card>
  )
}
