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
import { MEASUREMENTS_TABLE_CLASSNAMES } from './table-styles'

export default function TableLoading() {
  return (
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
        <TableColumn>
          <SortButton field="meter">Ponto</SortButton>
        </TableColumn>
        <TableColumn>
          <SortButton field="reference">Data</SortButton>
        </TableColumn>
        <TableColumn align="center">
          <SortButton field="hour">Hora</SortButton>
        </TableColumn>
        <TableColumn align="end">
          <div className="flex justify-end">
            <SortButton field="consumption">Consumo (MWh)</SortButton>
          </div>
        </TableColumn>
        <TableColumn>
          <SortButton field="origin">Origem</SortButton>
        </TableColumn>
      </TableHeader>

      <TableBody>
        {Array.from({ length: 10 }, (_, index) => index + 1).map(number => (
          <TableRow key={number} data-testid="table-row">
            {Array.from({ length: 6 }, (_, index) => index + 1).map(cell => (
              <TableCell key={cell}>
                <div className="skeleton-line h-4 w-[100px]"></div>
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
