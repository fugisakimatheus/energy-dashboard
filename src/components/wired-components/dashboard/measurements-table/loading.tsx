'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react'
import SortButton from './sort-button'

export default function TableLoading() {
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
        {Array.from({ length: 10 }, (_, index) => index + 1).map(number => (
          <TableRow
            key={number}
            data-testid="table-row"
            className="border-b border-gray-200 last:border-none h-14"
          >
            {Array.from({ length: 6 }, (_, index) => index + 1).map(cell => (
              <TableCell key={cell}>
                <div className="animate-pulse h-4 w-[100px] bg-gray-200 rounded-sm"></div>
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
