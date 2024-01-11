export type GetMeasurementsSortOptions =
  | "agent"
  | "meter"
  | "reference"
  | "hour"
  | "consumption"
  | "origin";

export interface GetMeasurementsFilters {
  day_eq?: string;
  day_gte?: string;
  day_lte?: string;
  month_eq?: string;
  month_gte?: string;
  month_lte?: string;
  year_eq?: string;
  year_gte?: string;
  year_lte?: string;
}

export interface GetMeasurementsSort {
  field: GetMeasurementsSortOptions;
  direction: "asc" | "desc";
}

export interface GetMeasurementsPagination {
  page: number;
  per_page: number;
}

export interface GetMeasurementsParams {
  filters?: GetMeasurementsFilters;
  sort?: GetMeasurementsSort;
  pagination?: GetMeasurementsPagination;
}
