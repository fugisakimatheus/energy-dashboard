import { Measurement } from '@/data/models/measurement/measurement-model'
import { MeasurementService } from '@/data/services/measurements-service'
import { create } from 'zustand'

type MeasurementStore = {
  hourlyMeasurements: {
    data: Measurement[]
  }
  isLoadingHourlyMeasurements: boolean
  getHourlyMeasurements: (day: string, month: string, year: string) => void
  paginatedMeasurements: {
    data: Measurement[]
    page: number
    totalItems: number
  }
  isLoadingPaginatedMeasurements: boolean
  setPage: (page: number) => void
  getPaginatedMeasurements: () => void
}

export const useMeasurementStore = create<MeasurementStore>()((set, get) => ({
  hourlyMeasurements: { data: [] },
  isLoadingHourlyMeasurements: false,
  getHourlyMeasurements: async (day: string, month: string, year: string) => {
    try {
      set(state => ({ ...state, isLoadingHourlyMeasurements: true }))
      const data = await MeasurementService.search(
        { filters: { day, month, year } },
        { cache: 'no-store' },
      )
      set(state => ({
        ...state,
        hourlyMeasurements: { ...state.hourlyMeasurements, data },
      }))
    } catch (error) {
    } finally {
      set(state => ({ ...state, isLoadingHourlyMeasurements: false }))
    }
  },
  paginatedMeasurements: {
    data: [],
    page: 1,
    totalItems: 17520,
  },
  isLoadingPaginatedMeasurements: false,
  setPage: (page: number) => {
    set(state => ({
      ...state,
      paginatedMeasurements: { ...state.paginatedMeasurements, page },
    }))
  },
  getPaginatedMeasurements: async () => {
    const { page } = get().paginatedMeasurements
    try {
      set(state => ({ ...state, isLoadingPaginatedMeasurements: true }))
      const response = await MeasurementService.search({
        pagination: { page },
      })
      set(state => ({
        ...state,
        paginatedMeasurements: {
          ...state.paginatedMeasurements,
          data: response,
        },
      }))
    } catch (error) {
    } finally {
      set(state => ({ ...state, isLoadingPaginatedMeasurements: false }))
    }
  },
}))
