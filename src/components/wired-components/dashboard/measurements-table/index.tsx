'use client'

import Card from '@/components/dump-components/card'
import DateRangePicker from '@/components/dump-components/date-range-picker'
import ErrorBox from '@/components/dump-components/error-box'
import NoDataBox from '@/components/dump-components/no-data-box'
import { useMeasurementStore } from '@/store/measurement-store'
import { formatEnergy } from '@/utils/number'
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
import { MEASUREMENTS_TABLE_CLASSNAMES } from './table-styles'

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

  const isLoading = status === 'loading' || status === 'pristine'
  const isError = status === 'error'
  const isSuccess = status === 'success'
  const hasData = measurements.length > 0

  const canShowPaginator = hasData && !isError && !isLoading

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
      return (
        <div className="table-shell">
          <TableLoading />
        </div>
      )
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
      <div className="table-shell">
        <Table
          shadow="none"
          radius="none"
          classNames={MEASUREMENTS_TABLE_CLASSNAMES}
          aria-label="Measurements table data"
        >
          <TableHeader>
            <TableColumn className="min-w-[96px]">
              <SortButton field="agent">Agente</SortButton>
            </TableColumn>
            <TableColumn className="min-w-[120px] max-w-[200px]">
              <SortButton field="meter">Ponto</SortButton>
            </TableColumn>
            <TableColumn className="min-w-[108px]">
              <SortButton field="reference">Data</SortButton>
            </TableColumn>
            <TableColumn align="center" className="w-16">
              <SortButton field="hour">Hora</SortButton>
            </TableColumn>
            <TableColumn align="end" className="min-w-[148px]">
              <div className="flex justify-end">
                <SortButton field="consumption">Consumo (MWh)</SortButton>
              </div>
            </TableColumn>
            <TableColumn className="min-w-[120px]">
              <SortButton field="origin">Origem</SortButton>
            </TableColumn>
          </TableHeader>

          <TableBody>
            {measurements.map(measurement => (
              <TableRow key={measurement.id}>
                <TableCell className="font-medium">{measurement.agent}</TableCell>
                <TableCell>
                  <span
                    className="block max-w-[200px] truncate font-medium"
                    title={measurement.meter}
                  >
                    {measurement.meter}
                  </span>
                </TableCell>
                <TableCell className="whitespace-nowrap font-medium">
                  {measurement.reference}
                </TableCell>
                <TableCell className="text-center font-medium tabular-nums">
                  {measurement.hour}
                </TableCell>
                <TableCell className="text-right font-medium tabular-nums">
                  {formatEnergy(measurement.consumption)}
                </TableCell>
                <TableCell className="font-medium text-muted-foreground">
                  {measurement.origin}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }

  return (
    <Card fitContent>
      <div className="mb-5 flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-base font-semibold text-foreground sm:text-lg">
          Medições
        </h2>
        <div className="w-full sm:w-auto sm:min-w-[300px]">
          <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            onChange={value => handleDateChange(value)}
          />
        </div>
      </div>
      {renderTable()}
      {canShowPaginator && <MeasurementsTablePaginator />}
    </Card>
  )
}
