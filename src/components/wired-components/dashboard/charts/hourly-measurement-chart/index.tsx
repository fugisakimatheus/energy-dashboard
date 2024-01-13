'use client'

import Card from '@/components/dump-components/card'
import Select from '@/components/dump-components/select'
import { useMeasurementStore } from '@/store/measurement-store'
import {
  generateMonthDays,
  generateMonthsWithNames,
  getAvailableYears,
} from '@/utils/date'
import { useEffect, useState } from 'react'
import HourlyMeasurementChartWrapper from './chart'

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
    label: `${measurement.day}/${measurement.month} às ${measurement.hour}h`,
    value: measurement.consumption,
  }))

  return (
    <Card>
      <div className="px-4 mb-6 flex flex-col">
        <span className="font-semibold text-lg text-[#374151]">
          Medição Horária (Por Dia)
        </span>
      </div>

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

      <div className="w-full h-full max-h-[320px] px-2">
        <HourlyMeasurementChartWrapper
          maxFlex={110}
          minFlex={90}
          flatConsumption={100}
          data={hourlyData}
        />
      </div>
    </Card>
  )
}
