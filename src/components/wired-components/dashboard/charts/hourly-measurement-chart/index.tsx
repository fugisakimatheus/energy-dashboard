'use client'

import { useMeasurementStore } from '@/store/measurement-store'
import {
  generateMonthDays,
  generateMonthsWithNames,
  getAvailableYears,
} from '@/utils/date'
import { useEffect, useState } from 'react'
import HourlyMeasurementChartWrapper from './chart'
import Select from '@/components/dump-components/select'

export default function HourlyMeasurementChart() {
  const [selectedDay, setSelectedDay] = useState<string>('31')
  const [selectedMonth, setSelectedMonth] = useState<string>('12')
  const [selectedYear, setSelectedYear] = useState<string>('2022')

  const getHourlyMeasurements = useMeasurementStore(
    state => state.getHourlyMeasurements,
  )
  const hourlyMeasurements = useMeasurementStore(
    state => state.hourlyMeasurements.data,
  )

  useEffect(() => {
    getHourlyMeasurements(selectedDay, selectedMonth, selectedYear)
  }, [getHourlyMeasurements, selectedDay, selectedMonth, selectedYear])

  const hourlyData = hourlyMeasurements.map(measurement => ({
    label: `${measurement.day}/${measurement.month} ${measurement.hour}h`,
    value: measurement.consumption,
  }))

  return (
    <div className="w-full h-full px-4 pt-8 pb-6 bg-white shadow-sm border border-gray-200 rounded-lg">
      <div className="px-4 mb-6 flex flex-col">
        <span className="font-semibold text-lg text-[#374151]">
          Medição Horária (Por Dia)
        </span>
      </div>

      <div className="px-4 w-full flex flex-row items-center mb-6 gap-3 sm:gap-5 md:gap-16">
        <Select
          defaultSelectedKeys={[selectedDay]}
          onChange={e => setSelectedDay(e.target.value)}
          options={generateMonthDays().map(day => ({ label: day, value: day }))}
        />
        <Select
          defaultSelectedKeys={[selectedMonth]}
          onChange={e => setSelectedMonth(e.target.value)}
          options={generateMonthsWithNames().map(
            ({ monthName, monthNumber }) => ({
              label: monthName,
              value: monthNumber,
            }),
          )}
        />
        <Select
          defaultSelectedKeys={[selectedYear]}
          onChange={e => setSelectedYear(e.target.value)}
          options={getAvailableYears().map(year => ({
            label: year,
            value: year,
          }))}
        />
      </div>

      <div className="w-full h-full max-h-[320px] px-2">
        <HourlyMeasurementChartWrapper
          maxFlex={110}
          minFlex={90}
          flatConsumption={100}
          data={hourlyData}
        />
      </div>
    </div>
  )
}
