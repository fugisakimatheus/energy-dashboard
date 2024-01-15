'use client'

import { useMeasurementStore } from '@/store/measurement-store'
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md'

type SortButtonProps = {
  children: React.ReactNode
  field: string
}

export default function SortButton(props: SortButtonProps) {
  const { children, field } = props

  const getPaginatedMeasurements = useMeasurementStore(
    state => state.getPaginatedMeasurements,
  )
  const setPaginatedMeasurementsSort = useMeasurementStore(
    state => state.setPaginatedMeasurementsSort,
  )
  const sortsMap = useMeasurementStore(
    state => state.paginatedMeasurements.params.sortsMap,
  )

  const sort = sortsMap[field]
  const canShowUpArrow = !sort || sort === 'asc'
  const canShowDownArrow = !sort || sort === 'desc'

  const handleSort = () => {
    const sortValueMap: Record<string, string | null> = {
      undefined: 'asc',
      null: 'asc',
      asc: 'desc',
      desc: null,
    }
    const direction = sortValueMap[String(sort)]
    setPaginatedMeasurementsSort({ field, direction })
    getPaginatedMeasurements()
  }

  return (
    <div
      className="flex flex-row items-center gap-1.5 cursor-pointer"
      onClick={() => handleSort()}
    >
      {children}
      <div className="flex flex-col items-center justify-center text-xs">
        {canShowUpArrow && (
          <div className="rotate-90 -mb-1">
            <MdArrowBackIos size={10} className="text-gray-700" />
          </div>
        )}
        {canShowDownArrow && (
          <div className="rotate-90">
            <MdArrowForwardIos size={10} className="text-gray-700" />
          </div>
        )}
      </div>
    </div>
  )
}
