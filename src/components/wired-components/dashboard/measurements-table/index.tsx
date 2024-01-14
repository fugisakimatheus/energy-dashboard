'use client'

import Card from '@/components/dump-components/card'
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

export default function MeasurementsTable() {
  const getPaginatedMeasurements = useMeasurementStore(
    state => state.getPaginatedMeasurements,
  )
  const measurements = useMeasurementStore(
    state => state.paginatedMeasurements.data,
  )
  const status = useMeasurementStore(state => state.paginatedMeasurementsStatus)

  const isLoading = status === 'loading'
  const isError = status === 'error'
  const isSuccess = status === 'success'
  const hasData = measurements.length > 0

  const canShowPaginator = hasData && isSuccess

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
            Agente
          </TableColumn>
          <TableColumn className="bg-white text-sm font-bold">
            Ponto
          </TableColumn>
          <TableColumn className="bg-white text-sm font-bold">Data</TableColumn>
          <TableColumn className="bg-white text-sm font-bold">Hora</TableColumn>
          <TableColumn className="bg-white text-sm font-bold">
            Consumo Ativo (MWh)
          </TableColumn>
          <TableColumn className="bg-white text-sm font-bold min-w-[140px]">
            Origem
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
      <div className="px-4 w-full flex flex-row items-center justify-between gap-6 mb-4">
        <span className="text-[#374151] font-bold text-lg">Medições</span>
      </div>
      {renderTable()}
      {canShowPaginator && <MeasurementsTablePaginator />}
    </Card>
  )
}
