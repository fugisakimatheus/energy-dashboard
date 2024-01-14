'use client'

import Card from '@/components/dump-components/card'
import ChartLoading from '@/components/dump-components/chart-loading'
import Select from '@/components/dump-components/select'
import { useMeasurementStore } from '@/store/measurement-store'
import {
  generateMonthDays,
  generateMonthsWithNames,
  getAvailableYears,
} from '@/utils/date'
import { useCallback, useEffect, useState } from 'react'
import HourlyMeasurementChartWrapper from './chart'
import HourlyMeasurementChartHeader from './header'
import ErrorBox from '@/components/dump-components/error-box'
import NoDataBox from '@/components/dump-components/no-data-box'

export default function HourlyMeasurementChart() {
  const [selectedDay, setSelectedDay] = useState<string>('31')
  const [selectedMonth, setSelectedMonth] = useState<string>('12')
  const [selectedYear, setSelectedYear] = useState<string>('2022')

  const getHourlyMeasurements = useMeasurementStore(
    state => state.getHourlyMeasurements,
  )
  const status = useMeasurementStore(state => state.hourlyMeasurementsStatus)
  const hourlyMeasurements = useMeasurementStore(
    state => state.hourlyMeasurements.data,
  )

  const isLoading = status === 'loading'
  const isError = status === 'error'
  const isSuccess = status === 'success'
  const hasData = hourlyMeasurements.length > 0

  const handleGetHourlyMeasurements = useCallback(() => {
    getHourlyMeasurements(selectedDay, selectedMonth, selectedYear)
  }, [getHourlyMeasurements, selectedDay, selectedMonth, selectedYear])

  useEffect(() => {
    handleGetHourlyMeasurements()
  }, [handleGetHourlyMeasurements])

  const hourlyData = hourlyMeasurements.map(measurement => ({
    label: `${measurement.day}/${measurement.month} às ${measurement.hour}h`,
    value: measurement.consumption,
  }))

  const renderChart = () => {
    if (isLoading) {
      return (
        <div className="pt-7 w-full h-full items-center justify-center px-2">
          <ChartLoading colsNumber={15} />
        </div>
      )
    }
    if (isError) {
      return (
        <ErrorBox
          height="320px"
          onRetry={() => handleGetHourlyMeasurements()}
        />
      )
    }
    if (!hasData && isSuccess) {
      return <NoDataBox height="320px" />
    }
    return (
      <div className="w-full h-full max-h-[320px] px-2">
        <HourlyMeasurementChartWrapper
          maxFlex={110}
          minFlex={90}
          flatConsumption={100}
          data={hourlyData}
        />
      </div>
    )
  }

  return (
    <Card>
      <HourlyMeasurementChartHeader />

      <div className="px-4 w-full flex flex-row items-center mb-6 gap-3 sm:gap-5 md:gap-16">
        <Select
          defaultSelectedKeys={[selectedDay]}
          disallowEmptySelection
          onChange={e => setSelectedDay(e.target.value)}
          options={generateMonthDays().map(day => ({ label: day, value: day }))}
          aria-label="Day select field"
        />
        <Select
          defaultSelectedKeys={[selectedMonth]}
          disallowEmptySelection
          onChange={e => setSelectedMonth(e.target.value)}
          options={generateMonthsWithNames().map(
            ({ monthName, monthNumber }) => ({
              label: monthName,
              value: monthNumber,
            }),
          )}
          aria-label="Month select field"
        />
        <Select
          defaultSelectedKeys={[selectedYear]}
          disallowEmptySelection
          onChange={e => setSelectedYear(e.target.value)}
          options={getAvailableYears().map(year => ({
            label: year,
            value: year,
          }))}
          aria-label="Year select field"
        />
      </div>

      {renderChart()}
    </Card>
  )
}
