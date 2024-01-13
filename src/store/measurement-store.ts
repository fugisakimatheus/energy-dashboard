import { Measurement } from '@/data/models/measurement/measurement-model'
import { MeasurementService } from '@/data/services/measurements-service'
import { create } from 'zustand'

type MeasurementStore = {
  hourlyMeasurements: {
    data: Measurement[]
  }
  getHourlyMeasurements: (day: string, month: string, year: string) => void
  paginatedMeasurements: {
    data: Measurement[]
    page: number
    totalItems: number
    perPage: number
  }
  getPaginatedMeasurements: () => void
}

export const useMeasurementStore = create<MeasurementStore>()(set => ({
  hourlyMeasurements: { data: [] },
  getHourlyMeasurements: async (day: string, month: string, year: string) => {
    try {
      const data = await MeasurementService.search(
        { filters: { day, month, year } },
        { cache: 'no-cache' },
      )
      set(state => ({ ...state, hourlyMeasurements: { data } }))
    } catch (error) {}
  },
  paginatedMeasurements: {
    data: [],
    page: 1,
    totalItems: 0,
    perPage: 10,
  },
  getPaginatedMeasurements: () => {},
}))
