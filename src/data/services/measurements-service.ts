import { Measurement } from '../models/measurement/measurement-model'
import {
  GetMeasurementsParams,
  GetMeasurementsSort,
} from '../models/measurement/measurement-request-model'
import { GetMeasurementsResponse } from '../models/measurement/measurement-response-model'
import { HTTPRequestCacheConfig, HTTPService } from './http-service'

export class MeasurementService {
  private static buildSortParams(sorts: GetMeasurementsSort[]) {
    const _sort = sorts
      .filter(sort => !!sort.field)
      .map(sort => `${sort.direction === 'desc' ? '-' : ''}${sort.field}`)
      .join(',')
    return _sort
  }
  static async search(
    params: GetMeasurementsParams = {},
    config?: HTTPRequestCacheConfig,
  ): Promise<Measurement[]> {
    const { sorts = [], filters } = params

    const _sort = this.buildSortParams(sorts)

    try {
      const response = await HTTPService.request<Measurement[]>({
        path: '/measurements',
        method: 'GET',
        params: { _sort, ...filters },
        cacheConfig: config,
      })
      return response
    } catch (error) {
      return []
    }
  }

  static async getPaginated(
    params: GetMeasurementsParams = {},
    config?: HTTPRequestCacheConfig,
  ): Promise<GetMeasurementsResponse> {
    const { sorts = [], pagination, filters } = params

    const _page = pagination?.page ?? ''
    const _sort = this.buildSortParams(sorts)

    try {
      const response = await HTTPService.request<GetMeasurementsResponse>({
        path: '/measurements',
        method: 'GET',
        params: { _sort, _page, ...filters },
        cacheConfig: config,
      })
      return response
    } catch (error) {
      return {
        first: 1,
        items: 0,
        last: 1,
        pages: 1,
        prev: null,
        next: 0,
        data: [],
      }
    }
  }
}
