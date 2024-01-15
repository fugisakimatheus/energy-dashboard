'use client'

import { useMeasurementStore } from '@/store/measurement-store'
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md'

type Sort = 'asc' | 'desc' | null

type SortButtonProps = {
  children: React.ReactNode
  field: string
  onSort: () => void
}

export default function SortButton(props: SortButtonProps) {
  const { children, field, onSort } = props

  const setSortsMap = useMeasurementStore(state => state.setSortsMap)
  const sortsMap = useMeasurementStore(
    state => state.paginatedMeasurements.sortsMap,
  )
  const sort = sortsMap[field] as Sort

  const handleSort = () => {
    const sortValueMap: Record<string, Sort> = {
      undefined: 'asc',
      null: 'asc',
      asc: 'desc',
      desc: null,
    }
    const value = sortValueMap[String(sort)]
    setSortsMap(field, value)
    onSort()
  }

  return (
    <div
      className="flex flex-row items-center gap-1.5 cursor-pointer"
      onClick={() => handleSort()}
    >
      {children}
      <div className="flex flex-col items-center justify-center text-xs">
        {(!sort || sort === 'asc') && (
          <div className="rotate-90 -mb-1">
            <MdArrowBackIos size={10} className="text-gray-700" />
          </div>
        )}
        {(!sort || sort === 'desc') && (
          <div className="rotate-90">
            <MdArrowForwardIos size={10} className="text-gray-700" />
          </div>
        )}
      </div>
    </div>
  )
}
