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
    state =>
      state.paginatedMeasurementsStatus === 'loading' ||
      state.paginatedMeasurementsStatus === 'pristine',
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
    <div className="mt-5 flex w-full flex-col gap-3 border-t border-border/30 pt-5 sm:flex-row sm:items-center sm:justify-between">
      <span className="text-sm text-muted-foreground">
        Exibindo{' '}
        <span className="font-semibold text-foreground">
          {formatNumber(perPage * page)}
        </span>{' '}
        de{' '}
        <span className="font-semibold text-foreground">
          {formatNumber(totalItems)}
        </span>{' '}
        itens
      </span>

      <div className="flex flex-row items-center gap-2">
        <Button
          variant="bordered"
          radius="lg"
          size="sm"
          className="border-border/50 bg-surface/50 font-medium text-foreground"
          isDisabled={isDisabledPrevious}
          onClick={() => handleChangePage('previous')}
        >
          Anterior
        </Button>
        <Button
          variant="flat"
          radius="lg"
          size="sm"
          className="bg-accent/20 font-medium text-accent"
          isDisabled={isDisabledNext}
          onClick={() => handleChangePage('next')}
        >
          Próximo
        </Button>
      </div>
    </div>
  )
}
