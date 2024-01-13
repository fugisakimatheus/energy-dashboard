'use client'

import Card from '@/components/dump-components/card'
import { useMeasurementStore } from '@/store/measurement-store'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from '@nextui-org/react'
import { useEffect } from 'react'
import TableLoading from './loading'

export default function MeasurementsTable() {
  const getPaginatedMeasurements = useMeasurementStore(
    state => state.getPaginatedMeasurements,
  )
  const isLoadingPaginatedMeasurements = useMeasurementStore(
    state => state.isLoadingPaginatedMeasurements,
  )
  const setPage = useMeasurementStore(state => state.setPage)
  const measurements = useMeasurementStore(
    state => state.paginatedMeasurements.data,
  )
  const totalItems = useMeasurementStore(
    state => state.paginatedMeasurements.totalItems,
  )
  const page = useMeasurementStore(state => state.paginatedMeasurements.page)
  const perPage = 10

  useEffect(() => {
    getPaginatedMeasurements()
  }, [getPaginatedMeasurements])

  const handlePreviousPage = () => {
    setPage(page - 1)
    getPaginatedMeasurements()
  }

  const handleNextPage = () => {
    setPage(page + 1)
    getPaginatedMeasurements()
  }

  return (
    <Card>
      <div className="px-4 w-full flex flex-row items-center justify-between gap-6 mb-4">
        <span className="text-[#374151] font-bold text-lg">Medições</span>
      </div>

      {isLoadingPaginatedMeasurements ? (
        <TableLoading />
      ) : (
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
            <TableColumn className="bg-white text-sm font-bold">
              Data
            </TableColumn>
            <TableColumn className="bg-white text-sm font-bold">
              Hora
            </TableColumn>
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
                <TableCell className="font-medium">
                  {measurement.meter}
                </TableCell>
                <TableCell className="font-medium">
                  {measurement.reference}
                </TableCell>
                <TableCell className="font-medium">
                  {measurement.hour}
                </TableCell>
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
      )}

      <div className="px-4 w-full flex flex-row items-center justify-between gap-6 mt-6">
        <span className="text-[#6B7280] text-sm font-medium">
          Exibindo {perPage * page} de {totalItems} itens
        </span>

        <div className="flex flex-row items-center gap-2">
          <Button
            variant="bordered"
            color="primary"
            radius="sm"
            className="border font-medium"
            isDisabled={page === 1 || isLoadingPaginatedMeasurements}
            onClick={() => handlePreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="bordered"
            color="primary"
            radius="sm"
            className="border font-medium"
            isDisabled={
              page * perPage >= totalItems || isLoadingPaginatedMeasurements
            }
            onClick={() => handleNextPage()}
          >
            Próximo
          </Button>
        </div>
      </div>
    </Card>
  )
}
