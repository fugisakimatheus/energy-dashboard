import { Measurement } from '@/data/models/measurement/measurement-model'
import { MeasurementService } from '@/data/services/measurements-service'
import { create } from 'zustand'

type LoadingStatus = 'pristine' | 'loading' | 'success' | 'error'

type MeasurementStore = {
  hourlyMeasurements: {
    data: Measurement[]
  }
  hourlyMeasurementsStatus: LoadingStatus
  getHourlyMeasurements: (day: string, month: string, year: string) => void
  paginatedMeasurements: {
    data: Measurement[]
    page: number
    totalItems: number
  }
  paginatedMeasurementsStatus: LoadingStatus
  setPage: (page: number) => void
  getPaginatedMeasurements: () => void
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
    if (typeof response !== 'string') {
      set(state => ({
        ...state,
        hourlyMeasurements: { ...state.hourlyMeasurements, data: response },
        hourlyMeasurementsStatus: 'success',
      }))
      return
    }
    set(state => ({ ...state, hourlyMeasurementsStatus: 'error' }))
  },
  paginatedMeasurements: {
    data: [],
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
  getPaginatedMeasurements: async () => {
    const { page } = get().paginatedMeasurements
    set(state => ({ ...state, paginatedMeasurementsStatus: 'loading' }))

    const response = await MeasurementService.search({
      pagination: { page },
    })
    if (typeof response !== 'string') {
      set(state => ({
        ...state,
        paginatedMeasurementsStatus: 'success',
        paginatedMeasurements: {
          ...state.paginatedMeasurements,
          data: response,
        },
      }))
      return
    }
    set(state => ({ ...state, paginatedMeasurementsStatus: 'error' }))
  },
}))
