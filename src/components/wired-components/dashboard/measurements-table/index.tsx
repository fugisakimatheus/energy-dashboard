'use client'

import Card from '@/components/dump-components/card'
import DateRangePicker from '@/components/dump-components/date-range-picker'
import ErrorBox from '@/components/dump-components/error-box'
import NoDataBox from '@/components/dump-components/no-data-box'
import { useMeasurementStore } from '@/store/measurement-store'
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react'
import { useEffect } from 'react'
import TableLoading from './loading'
import MeasurementsTablePaginator from './paginator'
import SortButton from './sort-button'

export default function MeasurementsTable() {
  const getPaginatedMeasurements = useMeasurementStore(
    state => state.getPaginatedMeasurements,
  )
  const setPaginatedMeasurementsDate = useMeasurementStore(
    state => state.setPaginatedMeasurementsDate,
  )
  const { startDate, endDate } = useMeasurementStore(
    state => state.paginatedMeasurements.params,
  )
  const measurements = useMeasurementStore(
    state => state.paginatedMeasurements.data,
  )
  const status = useMeasurementStore(state => state.paginatedMeasurementsStatus)

  const isLoading = status === 'loading'
  const isError = status === 'error'
  const isSuccess = status === 'success'
  const hasData = measurements.length > 0

  const canShowPaginator = (hasData && !isError) || isSuccess

  const handleDateChange = (value: (Date | null)[]) => {
    setPaginatedMeasurementsDate({ start: value[0], end: value[1] })
    const hasTwoValues = value.filter(o => o)
    if (hasTwoValues.length > 1 || hasTwoValues.length === 0) {
      getPaginatedMeasurements()
    }
  }

  useEffect(() => {
    getPaginatedMeasurements()
  }, [getPaginatedMeasurements])

  const renderTable = () => {
    if (isLoading) {
      return <TableLoading />
    }
    if (isError) {
      return (
        <ErrorBox height="400px" onRetry={() => getPaginatedMeasurements()} />
      )
    }
    if (!hasData && isSuccess) {
      return <NoDataBox height="400px" />
    }
    return (
      <Table
        shadow="none"
        radius="none"
        className="text-[#6B7280]"
        aria-label="Measurements table data"
      >
        <TableHeader>
          <TableColumn className="bg-white text-sm font-bold min-w-[100px]">
            <SortButton field="agent">Agente</SortButton>
          </TableColumn>
          <TableColumn className="bg-white text-sm font-bold">
            <SortButton field="meter">Ponto</SortButton>
          </TableColumn>
          <TableColumn className="bg-white text-sm font-bold">
            <SortButton field="reference">Data</SortButton>
          </TableColumn>
          <TableColumn className="bg-white text-sm font-bold">
            <SortButton field="hour">Hora</SortButton>
          </TableColumn>
          <TableColumn className="bg-white text-sm font-bold">
            <SortButton field="consumption">Consumo Ativo (MWh)</SortButton>
          </TableColumn>
          <TableColumn className="bg-white text-sm font-bold min-w-[140px]">
            <SortButton field="origin">Origem</SortButton>
          </TableColumn>
        </TableHeader>

        <TableBody>
          {measurements.map(measurement => (
            <TableRow
              key={measurement.id}
              className="border-b border-gray-200 last:border-none h-14"
            >
              <TableCell className="font-medium min-w-[100px]">
                {measurement.agent}
              </TableCell>
              <TableCell className="font-medium">{measurement.meter}</TableCell>
              <TableCell className="font-medium">
                {measurement.reference}
              </TableCell>
              <TableCell className="font-medium">{measurement.hour}</TableCell>
              <TableCell className="font-medium">
                {measurement.consumption}
              </TableCell>
              <TableCell className="font-medium min-w-[140px]">
                {measurement.origin}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }

  return (
    <Card fitContent>
      <div className="px-4 w-full flex flex-col md:flex-row items-center justify-between gap-6 mb-4">
        <span className="text-[#374151] font-bold text-lg">Medições</span>
        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          onChange={value => handleDateChange(value)}
        />
      </div>
      {renderTable()}
      {canShowPaginator && <MeasurementsTablePaginator />}
    </Card>
  )
}
