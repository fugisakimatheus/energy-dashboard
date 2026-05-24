import { HTTPService, HTTPRequestConfig } from '../http-service'

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

describe('HTTPService', () => {
  beforeEach(() => {
    global.fetch = jest.fn() as any
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should make a successful request', async () => {
    const fetch = global.fetch as jest.MockedFunction<typeof global.fetch>

    const mockConfig: HTTPRequestConfig = {
      path: '/measurements',
      method: 'GET',
      params: { key: 'value' },
      cacheConfig: { cache: 'default', revalidate: 60 },
    }

    const mockResponse = { data: 'measurements' }
    fetch.mockResolvedValue(mockFetchResponse(mockResponse))

    const result = await HTTPService.request(mockConfig)

    expect(global.fetch).toHaveBeenCalledWith(
      'https://energy-dashboard-api.vercel.app/measurements?key=value',
      expect.objectContaining({
        method: 'GET',
        cache: 'default',
        next: { revalidate: 60, tags: ['measurements'] },
      }),
    )
    expect(result).toEqual(mockResponse)
  })

  it('should return total count from response headers', async () => {
    const fetch = global.fetch as jest.MockedFunction<typeof global.fetch>

    fetch.mockResolvedValue(
      mockFetchResponse([], { totalCount: '17520' }),
    )

    const result = await HTTPService.requestWithMeta({
      path: '/measurements',
      method: 'GET',
      params: { _page: 1, _limit: 10 },
    })

    expect(result.totalCount).toBe(17520)
    expect(result.data).toEqual([])
  })

  it('should handle request error', async () => {
    const fetch = global.fetch as jest.MockedFunction<typeof global.fetch>

    const mockConfig: HTTPRequestConfig = {
      path: '/measurements',
      method: 'GET',
    }

    fetch.mockResolvedValue(mockFetchResponse(null, { ok: false, status: 404 }))

    await expect(HTTPService.request(mockConfig)).rejects.toThrow()
  })

  it('should ignore empty param values', async () => {
    const fetch = global.fetch as jest.MockedFunction<typeof global.fetch>

    fetch.mockResolvedValue(mockFetchResponse([]))

    await HTTPService.request({
      path: '/measurements',
      method: 'GET',
      params: { _sort: '', _order: '', year: '2022' },
    })

    expect(global.fetch).toHaveBeenCalledWith(
      'https://energy-dashboard-api.vercel.app/measurements?year=2022',
      expect.any(Object),
    )
  })
})
