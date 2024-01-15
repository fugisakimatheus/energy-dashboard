'use client'

import ptBR from 'date-fns/locale/pt-BR'
import DatePicker, { registerLocale } from 'react-datepicker'
import './calendar.css'
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
    <div className="w-[340px]">
      <DatePicker
        data-testid="datepicker"
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
        wrapperClassName="w-[340px]"
        calendarClassName="custom-calendar"
        calendarIconClassname="fill-gray-400"
        clearButtonClassName="after:!bg-gray-400 after:!text-white after:!font-semibold"
        className="w-[340px] outline-none border-2 rounded-md border-gray-300 text-sm font-semibold text-gray-600"
      />
    </div>
  )
}
