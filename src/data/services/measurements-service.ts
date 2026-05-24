import { Measurement } from '../models/measurement/measurement-model'
import {
  GetMeasurementsParams,
  GetMeasurementsSort,
} from '../models/measurement/measurement-request-model'
import { HTTPRequestCacheConfig, HTTPService } from './http-service'

export const MEASUREMENTS_PER_PAGE = 10

export type PaginatedSearchResult =
  | { data: Measurement[]; totalCount: number }
  | string

export class MeasurementService {
  private static buildSortParams(sorts: GetMeasurementsSort[]) {
    const _sort = sorts.map(sort => sort.field).join(',')
    const _order = sorts.map(sort => sort.direction).join(',')
    return { _sort, _order }
  }

  private static buildRequestParams(
    params: GetMeasurementsParams,
    options?: { paginate?: boolean },
  ) {
    const { sorts = [], pagination, filters } = params
    const { _sort, _order } = this.buildSortParams(sorts)

    const requestParams: Record<string, string | number> = {
      _sort,
      _order,
      ...filters,
    }

    if (options?.paginate && pagination?.page) {
      requestParams._page = pagination.page
      requestParams._limit = MEASUREMENTS_PER_PAGE
    } else if (pagination?.page) {
      requestParams._page = pagination.page
    }

    return requestParams
  }

  static async search(
    params: GetMeasurementsParams = {},
    config?: HTTPRequestCacheConfig,
  ): Promise<Measurement[] | string> {
    try {
      const response = await HTTPService.request<Measurement[]>({
        path: '/measurements',
        method: 'GET',
        params: this.buildRequestParams(params),
        cacheConfig: config,
      })

      if (!Array.isArray(response)) {
        return 'Erro ao carregar dados'
      }

      return response
    } catch {
      return 'Erro ao carregar dados'
    }
  }

  static async searchPaginated(
    params: GetMeasurementsParams = {},
    config?: HTTPRequestCacheConfig,
  ): Promise<PaginatedSearchResult> {
    if (!params.pagination?.page) {
      return 'Erro ao carregar dados'
    }

    try {
      const { data, totalCount } = await HTTPService.requestWithMeta<
        Measurement[]
      >({
        path: '/measurements',
        method: 'GET',
        params: this.buildRequestParams(params, { paginate: true }),
        cacheConfig: config,
      })

      if (!Array.isArray(data)) {
        return 'Erro ao carregar dados'
      }

      return {
        data,
        totalCount: totalCount ?? data.length,
      }
    } catch {
      return 'Erro ao carregar dados'
    }
  }

  static async getCount(
    params: Omit<GetMeasurementsParams, 'pagination'> = {},
    config?: HTTPRequestCacheConfig,
  ): Promise<number> {
    const { sorts = [], filters } = params
    const { _sort, _order } = this.buildSortParams(sorts)

    try {
      const { totalCount } = await HTTPService.requestWithMeta<Measurement[]>({
        path: '/measurements',
        method: 'GET',
        params: {
          _page: 1,
          _limit: 1,
          _sort,
          _order,
          ...filters,
        },
        cacheConfig: config,
      })

      return totalCount ?? 0
    } catch {
      return 0
    }
  }
}
