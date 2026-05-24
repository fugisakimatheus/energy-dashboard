'use client'

import SingleDatePicker from '@/components/dump-components/single-date-picker'
import { shiftMeasurementDate } from '@/utils/date'
import { Button } from '@nextui-org/react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'

type HourlyPeriodFilterProps = {
  selectedDate: Date
  onDateChange: (date: Date) => void
  isLoading?: boolean
}

export default function HourlyPeriodFilter(props: HourlyPeriodFilterProps) {
  const { selectedDate, onDateChange, isLoading = false } = props

  const previousDate = shiftMeasurementDate(selectedDate, -1)
  const nextDate = shiftMeasurementDate(selectedDate, 1)

  return (
    <div className="flex w-full items-center gap-1.5 sm:w-auto sm:max-w-[300px]">
      <Button
        isIconOnly
        size="sm"
        radius="lg"
        variant="bordered"
        aria-label="Dia anterior"
        className="shrink-0 border-border/50 bg-surface/40"
        isDisabled={!previousDate || isLoading}
        onPress={() => previousDate && onDateChange(previousDate)}
      >
        <MdChevronLeft size={18} />
      </Button>

      <div className="min-w-0 flex-1">
        <SingleDatePicker selected={selectedDate} onChange={onDateChange} />
      </div>

      <Button
        isIconOnly
        size="sm"
        radius="lg"
        variant="bordered"
        aria-label="Próximo dia"
        className="shrink-0 border-border/50 bg-surface/40"
        isDisabled={!nextDate || isLoading}
        onPress={() => nextDate && onDateChange(nextDate)}
      >
        <MdChevronRight size={18} />
      </Button>
    </div>
  )
}
