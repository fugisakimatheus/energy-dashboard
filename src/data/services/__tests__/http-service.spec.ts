import { HTTPService, HTTPRequestConfig } from '../http-service'

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
    fetch.mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    } as Response)

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

  it('should handle request error', async () => {
    const fetch = global.fetch as jest.MockedFunction<typeof global.fetch>

    const mockConfig: HTTPRequestConfig = {
      path: '/measurements',
      method: 'GET',
    }

    fetch.mockResolvedValue({
      ok: false,
      status: 404,
    } as Response)

    await expect(HTTPService.request(mockConfig)).rejects.toThrow()
  })
})
