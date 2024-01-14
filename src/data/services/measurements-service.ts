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
    const { sorts = [], pagination, filters } = params

    const _page = pagination?.page ?? ''
    const _sort = this.buildSortParams(sorts)

    try {
      const response = await HTTPService.request<Measurement[]>({
        path: '/measurements',
        method: 'GET',
        params: { _page, _sort, ...filters },
        cacheConfig: config,
      })
      return response
    } catch (error) {
      return []
    }
  }
}
