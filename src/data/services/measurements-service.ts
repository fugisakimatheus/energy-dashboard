import { GetMeasurementsParams } from '../models/measurement/measurement-request-model'
import { GetMeasurementsResponse } from '../models/measurement/measurement-response-model'
import { HTTPService } from './http-service'

export class MeasurementService {
  static async search(params: GetMeasurementsParams) {
    const filters = params.filters
    const sort = params.sort
    const pagination = {
      _page: params.pagination?.page || 1,
      _per_page: params.pagination?.per_page || 10,
    }

    const _sort = sort
      ? `${sort.direction === 'desc' ? '-' : ''}${sort.field}`
      : 'reference'

    const response = await HTTPService.request<GetMeasurementsResponse>({
      path: '/measurements',
      method: 'GET',
      params: { _sort, ...pagination, ...filters },
    })
    return response
  }
}
