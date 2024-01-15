'use client'

import { useMeasurementStore } from '@/store/measurement-store'
import { formatNumber } from '@/utils/number'
import { Button } from '@nextui-org/react'

export default function MeasurementsTablePaginator() {
  const getPaginatedMeasurements = useMeasurementStore(
    state => state.getPaginatedMeasurements,
  )
  const setPage = useMeasurementStore(state => state.setPage)
  const isLoading = useMeasurementStore(
    state => state.paginatedMeasurementsStatus === 'loading',
  )
  const { page, totalItems, data } = useMeasurementStore(
    state => state.paginatedMeasurements,
  )
  const hasData = data.length > 0

  const perPage = 10
  const isDisabledPrevious = page === 1 || isLoading
  const isDisabledNext = page * perPage >= totalItems || isLoading || !hasData

  const handleChangePage = (action: 'next' | 'previous') => {
    const operator = action === 'next' ? 1 : -1
    const increment = operator * 1
    setPage(page + increment)
    getPaginatedMeasurements()
  }

  return (
    <div className="px-4 w-full flex flex-row items-center justify-between gap-6 mt-6">
      <span className="text-[#6B7280] text-sm font-medium">
        Exibindo {formatNumber(perPage * page)} de {formatNumber(totalItems)}{' '}
        itens
      </span>

      <div className="flex flex-row items-center gap-2">
        <Button
          variant="bordered"
          color="primary"
          radius="sm"
          className="border font-medium"
          isDisabled={isDisabledPrevious}
          onClick={() => handleChangePage('previous')}
        >
          Anterior
        </Button>
        <Button
          variant="bordered"
          color="primary"
          radius="sm"
          className="border font-medium"
          isDisabled={isDisabledNext}
          onClick={() => handleChangePage('next')}
        >
          Próximo
        </Button>
      </div>
    </div>
  )
}
