export type GetMeasurementsSortOptions =
  | 'agent'
  | 'meter'
  | 'reference'
  | 'hour'
  | 'consumption'
  | 'origin'
  | 'year'
  | 'month'
  | 'day'

export interface GetMeasurementsFilters {
  day?: string
  day_gte?: string
  day_lte?: string
  month?: string
  month_gte?: string
  month_lte?: string
  year?: string
  year_gte?: string
  year_lte?: string
}

export interface GetMeasurementsSort {
  field: GetMeasurementsSortOptions
  direction: 'asc' | 'desc'
}

export interface GetMeasurementsPagination {
  page: number
}

export interface GetMeasurementsParams {
  filters?: GetMeasurementsFilters
  sorts?: GetMeasurementsSort[]
  pagination?: GetMeasurementsPagination
}
