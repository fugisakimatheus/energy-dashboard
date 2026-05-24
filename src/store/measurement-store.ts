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

let hourlyRequestId = 0
let paginatedRequestId = 0

const buildDateFilters = (
  start?: Date | null,
  end?: Date | null,
): GetMeasurementsFilters => {
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

  return filters
}

export const useMeasurementStore = create<MeasurementStore>()((set, get) => ({
  hourlyMeasurements: { data: [] },
  hourlyMeasurementsStatus: 'pristine',
  getHourlyMeasurements: async (day: string, month: string, year: string) => {
    const requestId = ++hourlyRequestId

    set(state => ({ ...state, hourlyMeasurementsStatus: 'loading' }))

    try {
      const response = await MeasurementService.search(
        { filters: { day, month, year } },
        { cache: 'no-store' },
      )

      if (requestId !== hourlyRequestId) {
        return
      }

      if (typeof response === 'string') {
        set(state => ({ ...state, hourlyMeasurementsStatus: 'error' }))
        return
      }

      set(state => ({
        ...state,
        hourlyMeasurements: { ...state.hourlyMeasurements, data: response },
        hourlyMeasurementsStatus: 'success',
      }))
    } catch {
      if (requestId !== hourlyRequestId) {
        return
      }

      set(state => ({ ...state, hourlyMeasurementsStatus: 'error' }))
    }
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
    const requestId = ++paginatedRequestId
    const { page, params } = get().paginatedMeasurements

    const sorts = Object.entries(params.sortsMap)
      .filter(([_, value]) => value)
      .map(([field, direction]) => ({
        field,
        direction,
      })) as GetMeasurementsSort[]

    const filters = buildDateFilters(params.startDate, params.endDate)

    set(state => ({ ...state, paginatedMeasurementsStatus: 'loading' }))

    try {
      const result = await MeasurementService.searchPaginated({
        pagination: { page },
        filters,
        sorts,
      })

      if (requestId !== paginatedRequestId) {
        return
      }

      if (typeof result === 'string') {
        set(state => ({ ...state, paginatedMeasurementsStatus: 'error' }))
        return
      }

      set(state => ({
        ...state,
        paginatedMeasurementsStatus: 'success',
        paginatedMeasurements: {
          ...state.paginatedMeasurements,
          data: result.data,
          totalItems: result.totalCount,
        },
      }))
    } catch {
      if (requestId !== paginatedRequestId) {
        return
      }

      set(state => ({ ...state, paginatedMeasurementsStatus: 'error' }))
    }
  },
}))
