'use client'

import { isAllowedMeasurementDate } from '@/utils/date'
import ptBR from 'date-fns/locale/pt-BR'
import DatePicker, { registerLocale } from 'react-datepicker'
import '../date-range-picker/calendar.css'

registerLocale('pt-BR', ptBR)

type SingleDatePickerProps = {
  selected: Date
  onChange: (date: Date) => void
  placeholder?: string
}

export default function SingleDatePicker(props: SingleDatePickerProps) {
  const { selected, onChange, placeholder = 'Selecione o dia' } = props

  return (
    <div className="datepicker-root w-full">
      <DatePicker
        data-testid="single-datepicker"
        selected={selected}
        onChange={date => {
          if (date) {
            onChange(date)
          }
        }}
        dateFormat="dd 'de' MMM'. de' yyyy"
        showYearDropdown
        showMonthDropdown
        locale="pt-BR"
        showIcon
        openToDate={selected}
        filterDate={isAllowedMeasurementDate}
        wrapperClassName="datepicker-wrapper"
        calendarClassName="custom-calendar"
        calendarIconClassname="datepicker-icon"
        className="datepicker-input"
        placeholderText={placeholder}
      />
    </div>
  )
}
