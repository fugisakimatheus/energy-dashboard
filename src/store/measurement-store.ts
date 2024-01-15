import { Measurement } from '@/data/models/measurement/measurement-model'
import {
  GetMeasurementsFilters,
  GetMeasurementsSort,
} from '@/data/models/measurement/measurement-request-model'
import { MeasurementService } from '@/data/services/measurements-service'
import { create } from 'zustand'

type LoadingStatus = 'pristine' | 'loading' | 'success' | 'error'

type GetPaginatedMeasurementsParams = {
  start?: Date | null
  end?: Date | null
}

type MeasurementStore = {
  hourlyMeasurements: {
    data: Measurement[]
  }
  hourlyMeasurementsStatus: LoadingStatus
  getHourlyMeasurements: (day: string, month: string, year: string) => void
  paginatedMeasurements: {
    data: Measurement[]
    sortsMap: Record<string, string | null>
    page: number
    totalItems: number
  }
  paginatedMeasurementsStatus: LoadingStatus
  setPage: (page: number) => void
  setSortsMap: (field: string, value: string | null) => void
  getPaginatedMeasurements: (params?: GetPaginatedMeasurementsParams) => void
}

export const useMeasurementStore = create<MeasurementStore>()((set, get) => ({
  hourlyMeasurements: { data: [] },
  hourlyMeasurementsStatus: 'pristine',
  getHourlyMeasurements: async (day: string, month: string, year: string) => {
    set(state => ({ ...state, hourlyMeasurementsStatus: 'loading' }))
    const response = await MeasurementService.search(
      { filters: { day, month, year } },
      { cache: 'no-store' },
    )
    if (typeof response === 'string') {
      set(state => ({ ...state, hourlyMeasurementsStatus: 'error' }))
      return
    }
    set(state => ({
      ...state,
      hourlyMeasurements: { ...state.hourlyMeasurements, data: response },
      hourlyMeasurementsStatus: 'success',
    }))
  },
  paginatedMeasurements: {
    data: [],
    sortsMap: {},
    page: 1,
    totalItems: 17520,
  },
  paginatedMeasurementsStatus: 'pristine',
  setPage: (page: number) => {
    set(state => ({
      ...state,
      paginatedMeasurements: { ...state.paginatedMeasurements, page },
    }))
  },
  setSortsMap: (field: string, value: string | null) => {
    const { sortsMap } = get().paginatedMeasurements
    const newSortsMap = { ...sortsMap, [field]: value }
    set(state => ({
      ...state,
      paginatedMeasurements: {
        ...state.paginatedMeasurements,
        sortsMap: newSortsMap,
      },
    }))
  },
  getPaginatedMeasurements: async (params?: GetPaginatedMeasurementsParams) => {
    const { page, sortsMap } = get().paginatedMeasurements
    const start = params?.start
    const end = params?.end
    const sorts = Object.entries(sortsMap)
      .filter(([_, value]) => value)
      .map(([field, direction]) => ({
        field,
        direction,
      })) as GetMeasurementsSort[]

    set(state => ({ ...state, paginatedMeasurementsStatus: 'loading' }))

    const filters: GetMeasurementsFilters = {}
    if (start) {
      const [day, month, year] = start.toLocaleDateString().split('/')
      filters.day_gte = day
      filters.month_gte = month
      filters.year_gte = year
    }
    if (end) {
      const [day, month, year] = end.toLocaleDateString().split('/')
      filters.day_lte = day
      filters.month_lte = month
      filters.year_lte = year
    }

    const response = await MeasurementService.search({
      pagination: { page },
      filters,
      sorts,
    })
    if (typeof response === 'string') {
      set(state => ({ ...state, paginatedMeasurementsStatus: 'error' }))
      return
    }
    set(state => ({
      ...state,
      paginatedMeasurementsStatus: 'success',
      paginatedMeasurements: {
        ...state.paginatedMeasurements,
        data: response,
      },
    }))
  },
}))
