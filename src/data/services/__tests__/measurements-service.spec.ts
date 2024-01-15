import { Measurement } from '@/data/models/measurement/measurement-model'
import { MeasurementService } from '../measurements-service'
import { MeasurementMock } from '@/data/models/__mocks__/measurement-mock'

describe('MeasurementService', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({ ok: true, json: () => Promise.resolve([]) }),
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
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockResponse),
        } as Response),
      )

      const result = await MeasurementService.search(
        {
          pagination: { page: 1 },
          sorts: [{ field: 'reference', direction: 'asc' }],
        },
        { cache: 'default' },
      )

      expect(global.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({ method: 'GET' }),
      )
      expect(result).toEqual(mockResponse)
    })

    it('should handle error while fetching measurements', async () => {
      const fetch = global.fetch as jest.MockedFunction<typeof global.fetch>

      fetch.mockImplementationOnce(() =>
        Promise.resolve({ ok: false, status: 404 } as Response),
      )

      const result = await MeasurementService.search({}, { cache: 'default' })

      expect(global.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({ method: 'GET' }),
      )
      expect(result).toEqual('Erro ao carregar dados')
    })
  })

  describe('getCount', () => {
    it('should fetch count successfully', async () => {
      const fetch = global.fetch as jest.MockedFunction<typeof global.fetch>

      const mockResponse: Measurement[] = new MeasurementMock().generate(8)

      fetch.mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockResponse),
        } as Response),
      )

      const result = await MeasurementService.getCount({}, { cache: 'default' })

      expect(global.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({ method: 'GET' }),
      )
      expect(result).toEqual(mockResponse.length)
    })

    it('should handle error while fetching count', async () => {
      const fetch = global.fetch as jest.MockedFunction<typeof global.fetch>

      fetch.mockImplementationOnce(() =>
        Promise.resolve({ ok: false, status: 404 } as Response),
      )

      const result = await MeasurementService.getCount({}, { cache: 'default' })

      expect(global.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({ method: 'GET' }),
      )
      expect(result).toEqual(0)
    })
  })
})
