'use client'

import './calendar.css'
import ptBR from 'date-fns/locale/pt-BR'
import DatePicker, { registerLocale } from 'react-datepicker'
registerLocale('pt-BR', ptBR)

type DateRangePickerProps = {
  startDate?: Date | null
  endDate?: Date | null
  onChange: (value: (Date | null)[]) => void
}

export default function DateRangePicker(props: DateRangePickerProps) {
  const { startDate, endDate, onChange } = props

  const filterDatesToShow = (date: Date) => {
    const year = date.getFullYear()
    return year === 2021 || year === 2022
  }

  return (
    <div className="w-[335px]">
      <DatePicker
        dateFormat="dd 'de' MMM'. de' yyyy"
        showYearDropdown
        showMonthDropdown
        locale="pt-BR"
        selectsRange
        isClearable
        placeholderText="Busca por datas"
        showIcon
        openToDate={new Date(2021, 0, 1)}
        startDate={startDate}
        endDate={endDate}
        onChange={value => onChange(value)}
        filterDate={filterDatesToShow}
        wrapperClassName="w-[335px]"
        calendarClassName="custom-calendar"
        calendarIconClassname="fill-gray-400"
        clearButtonClassName="after:!bg-gray-400"
        className="w-[335px] outline-none border-2 rounded-md border-gray-300 text-sm font-semibold text-gray-600"
      />
    </div>
  )
}
