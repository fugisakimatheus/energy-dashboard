import { Measurement } from '../models/measurement/measurement-model'
import { GetMeasurementsParams } from '../models/measurement/measurement-request-model'
import { GetMeasurementsResponse } from '../models/measurement/measurement-response-model'
import { HTTPRequestCacheConfig, HTTPService } from './http-service'

export class MeasurementService {
  static async search(
    params: GetMeasurementsParams = {},
    config?: HTTPRequestCacheConfig,
  ): Promise<Measurement[]> {
    const { sorts = [], pagination, filters } = params

    const _page = pagination?.page ?? ''
    const _per_page = pagination?.per_page ?? ''
    const _sort = sorts
      .filter(sort => !!sort.field)
      .map(sort => `${sort.direction === 'desc' ? '-' : ''}${sort.field}`)
      .join(',')

    try {
      const response = await HTTPService.request<GetMeasurementsResponse>({
        path: '/measurements',
        method: 'GET',
        params: { _sort, _page, _per_page, ...filters },
        cacheConfig: config,
      })
      return Array.isArray(response) ? response : response.data
    } catch (error) {
      return []
    }
  }
}
