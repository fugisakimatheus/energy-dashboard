import { Measurement } from '@/data/models/measurement/measurement-model'
import { MeasurementService } from '../measurements-service'
import { MeasurementMock } from '@/data/models/__mocks__/measurement-mock'

const mockFetchResponse = (
  data: unknown,
  options?: { ok?: boolean; status?: number; totalCount?: string | null },
) => {
  const { ok = true, status = 200, totalCount = null } = options ?? {}

  return {
    ok,
    status,
    headers: {
      get: (name: string) =>
        name.toLowerCase() === 'x-total-count' ? totalCount : null,
    },
    json: async () => data,
  } as Response
}

describe('MeasurementService', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve(mockFetchResponse([])),
    ) as any
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('search', () => {
    it('should fetch measurements successfully', async () => {
      const fetch = global.fetch as jest.MockedFunction<typeof global.fetch>

      const mockResponse: Measurement[] = new MeasurementMock().generate()

      fetch.mockImplementationOnce(() =>
        Promise.resolve(mockFetchResponse(mockResponse)),
      )

      const result = await MeasurementService.search(
        {
          pagination: { page: 1 },
          sorts: [{ field: 'reference', direction: 'asc' }],
        },
        { cache: 'default' },
      )

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('_page=1'),
        expect.objectContaining({ method: 'GET' }),
      )
      expect(result).toEqual(mockResponse)
    })

    it('should handle error while fetching measurements', async () => {
      const fetch = global.fetch as jest.MockedFunction<typeof global.fetch>

      fetch.mockImplementationOnce(() =>
        Promise.resolve(mockFetchResponse(null, { ok: false, status: 404 })),
      )

      const result = await MeasurementService.search({}, { cache: 'default' })

      expect(result).toEqual('Erro ao carregar dados')
    })

    it('should handle invalid payload', async () => {
      const fetch = global.fetch as jest.MockedFunction<typeof global.fetch>

      fetch.mockImplementationOnce(() =>
        Promise.resolve(mockFetchResponse({ invalid: true })),
      )

      const result = await MeasurementService.search({}, { cache: 'default' })

      expect(result).toEqual('Erro ao carregar dados')
    })
  })

  describe('searchPaginated', () => {
    it('should fetch paginated measurements with total count', async () => {
      const fetch = global.fetch as jest.MockedFunction<typeof global.fetch>

      const mockResponse: Measurement[] = new MeasurementMock().generate(10)

      fetch.mockImplementationOnce(() =>
        Promise.resolve(
          mockFetchResponse(mockResponse, { totalCount: '17520' }),
        ),
      )

      const result = await MeasurementService.searchPaginated({
        pagination: { page: 1 },
      })

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('_page=1'),
        expect.objectContaining({ method: 'GET' }),
      )
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('_limit=10'),
        expect.objectContaining({ method: 'GET' }),
      )

      if (typeof result === 'string') {
        throw new Error('Expected paginated result')
      }

      expect(result.data).toEqual(mockResponse)
      expect(result.totalCount).toBe(17520)
    })
  })

  describe('getCount', () => {
    it('should fetch count from X-Total-Count header', async () => {
      const fetch = global.fetch as jest.MockedFunction<typeof global.fetch>

      fetch.mockImplementationOnce(() =>
        Promise.resolve(
          mockFetchResponse([{ id: 1 }], { totalCount: '42' }),
        ),
      )

      const result = await MeasurementService.getCount({}, { cache: 'default' })

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('_page=1'),
        expect.objectContaining({ method: 'GET' }),
      )
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('_limit=1'),
        expect.objectContaining({ method: 'GET' }),
      )
      expect(result).toBe(42)
    })

    it('should handle error while fetching count', async () => {
      const fetch = global.fetch as jest.MockedFunction<typeof global.fetch>

      fetch.mockImplementationOnce(() =>
        Promise.resolve(mockFetchResponse(null, { ok: false, status: 404 })),
      )

      const result = await MeasurementService.getCount({}, { cache: 'default' })

      expect(result).toEqual(0)
    })
  })
})
