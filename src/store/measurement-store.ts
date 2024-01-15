import { Measurement } from '@/data/models/measurement/measurement-model'
import {
  GetMeasurementsFilters,
  GetMeasurementsSort,
} from '@/data/models/measurement/measurement-request-model'
import { MeasurementService } from '@/data/services/measurements-service'
import { create } from 'zustand'

type LoadingStatus = 'pristine' | 'loading' | 'success' | 'error'

type PaginatedMeasurementsDate = {
  start?: Date | null
  end?: Date | null
}

type PaginatedMeasurementsSort = {
  field: string
  direction: string | null
}

export type MeasurementStore = {
  hourlyMeasurements: {
    data: Measurement[]
  }
  hourlyMeasurementsStatus: LoadingStatus
  getHourlyMeasurements: (
    day: string,
    month: string,
    year: string,
  ) => Promise<void>
  paginatedMeasurements: {
    data: Measurement[]
    page: number
    totalItems: number
    params: {
      startDate?: Date | null
      endDate?: Date | null
      sortsMap: Record<string, string | null>
    }
  }
  paginatedMeasurementsStatus: LoadingStatus
  setPage: (page: number) => void
  setPaginatedMeasurementsDate: (params?: PaginatedMeasurementsDate) => void
  setPaginatedMeasurementsSort: (sort?: PaginatedMeasurementsSort) => void
  getPaginatedMeasurements: () => Promise<void>
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
    page: 1,
    totalItems: 0,
    params: {
      startDate: null,
      endDate: null,
      sortsMap: {},
    },
  },
  paginatedMeasurementsStatus: 'pristine',
  setPage: (page: number) => {
    set(state => ({
      ...state,
      paginatedMeasurements: { ...state.paginatedMeasurements, page },
    }))
  },
  setPaginatedMeasurementsDate: (params?: PaginatedMeasurementsDate) => {
    const startDate = params?.start
    const endDate = params?.end
    set(state => {
      const params = { ...state.paginatedMeasurements.params }
      params.startDate = startDate
      params.endDate = endDate
      return {
        ...state,
        paginatedMeasurements: {
          ...state.paginatedMeasurements,
          params,
          page: 1,
        },
      }
    })
  },
  setPaginatedMeasurementsSort: (sort?: PaginatedMeasurementsSort) => {
    set(state => {
      const params = { ...state.paginatedMeasurements.params }
      const sortsMap = { ...state.paginatedMeasurements.params.sortsMap }
      if (sort) {
        sortsMap[sort.field] = sort.direction
        params.sortsMap = sortsMap
      }
      return {
        ...state,
        paginatedMeasurements: {
          ...state.paginatedMeasurements,
          params,
          page: 1,
        },
      }
    })
  },
  getPaginatedMeasurements: async () => {
    const { page, params } = get().paginatedMeasurements

    const start = params?.startDate
    const end = params?.endDate
    const sorts = Object.entries(params.sortsMap)
      .filter(([_, value]) => value)
      .map(([field, direction]) => ({
        field,
        direction,
      })) as GetMeasurementsSort[]

    set(state => ({ ...state, paginatedMeasurementsStatus: 'loading' }))

    const filters: GetMeasurementsFilters = {}
    if (start) {
      const [day, month, year] = start
        .toLocaleDateString('pt-BR')
        .split('/')
        .map(value => value.padStart(2, '0'))
      filters.day_gte = day
      filters.month_gte = month
      filters.year_gte = year
    }
    if (end) {
      const [day, month, year] = end
        .toLocaleDateString('pt-BR')
        .split('/')
        .map(value => value.padStart(2, '0'))
      filters.day_lte = day
      filters.month_lte = month
      filters.year_lte = year
    }

    const measurements = await MeasurementService.search({
      pagination: { page },
      filters,
      sorts,
    })
    const measurementsCount = await MeasurementService.getCount({ filters })

    if (typeof measurements === 'string') {
      set(state => ({ ...state, paginatedMeasurementsStatus: 'error' }))
      return
    }
    set(state => ({
      ...state,
      paginatedMeasurementsStatus: 'success',
      paginatedMeasurements: {
        ...state.paginatedMeasurements,
        data: measurements,
        totalItems: measurementsCount,
      },
    }))
  },
}))
