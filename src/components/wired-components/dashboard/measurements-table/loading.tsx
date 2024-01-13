'use client'

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@nextui-org/react'

export default function TableLoading() {
  return (
    <Table
      shadow="none"
      radius="none"
      className="text-[#6B7280]"
      aria-label="Measurements table data"
    >
      <TableHeader>
        <TableColumn className="bg-white text-sm font-bold" allowsSorting>
          Agente
        </TableColumn>
        <TableColumn className="bg-white text-sm font-bold" allowsSorting>
          Ponto
        </TableColumn>
        <TableColumn className="bg-white text-sm font-bold" allowsSorting>
          Data
        </TableColumn>
        <TableColumn className="bg-white text-sm font-bold" allowsSorting>
          Hora
        </TableColumn>
        <TableColumn className="bg-white text-sm font-bold" allowsSorting>
          Consumo Ativo (MWh)
        </TableColumn>
        <TableColumn className="bg-white text-sm font-bold" allowsSorting>
          Origem
        </TableColumn>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 10 }, (_, index) => index + 1).map(number => (
          <TableRow
            key={number}
            className="border-b border-gray-200 last:border-none h-14"
          >
            <TableCell>
              <div className="animate-pulse h-4 w-[100px] bg-gray-200"></div>
            </TableCell>
            <TableCell>
              <div className="animate-pulse h-4 w-[120px] bg-gray-200"></div>
            </TableCell>
            <TableCell>
              <div className="animate-pulse h-4 w-[100px] bg-gray-200"></div>
            </TableCell>
            <TableCell>
              <div className="animate-pulse h-4 w-[60px] bg-gray-200"></div>
            </TableCell>
            <TableCell>
              <div className="animate-pulse h-4 w-[120px] bg-gray-200"></div>
            </TableCell>
            <TableCell>
              <div className="animate-pulse h-4 w-[140px] bg-gray-200"></div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
