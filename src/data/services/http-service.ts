export type HTTPRequestCacheOptions = 'default' | 'no-store' | 'no-cache'

export type HTTPRequestMethods = 'GET' | 'POST' | 'PUT' | 'DELETE'

export interface HTTPRequestCacheConfig {
  cache?: HTTPRequestCacheOptions
  revalidate?: number
}

export interface HTTPRequestConfig {
  path: string
  method: HTTPRequestMethods
  params?: Record<string, string | number>
  cacheConfig?: HTTPRequestCacheConfig
  timeoutMs?: number
}

export interface HTTPResponseMeta<Response> {
  data: Response
  totalCount: number | null
}

const BASE_URL = 'https://energy-dashboard-api.vercel.app'
const DEFAULT_TIMEOUT_MS = 20_000

const createTimeoutSignal = (timeoutMs: number): AbortSignal => {
  if (typeof AbortSignal.timeout === 'function') {
    return AbortSignal.timeout(timeoutMs)
  }

  const controller = new AbortController()
  setTimeout(() => controller.abort(), timeoutMs)
  return controller.signal
}

export class HTTPService {
  static async request<Response>(config: HTTPRequestConfig): Promise<Response> {
    const { data } = await this.requestWithMeta<Response>(config)
    return data
  }

  static async requestWithMeta<Response>(
    config: HTTPRequestConfig,
  ): Promise<HTTPResponseMeta<Response>> {
    const { path, method, params, cacheConfig, timeoutMs = DEFAULT_TIMEOUT_MS } =
      config

    let url = `${BASE_URL}${path}`

    if (params) {
      const parsedParams = Object.entries(params)
        .filter(([_key, value]) => value !== '' && value !== undefined)
        .map(([key, value]) => ({ key, value: String(value) }))
        .reduce((acc, { key, value }) => ({ ...acc, [key]: value }), {})

      const paramsString = new URLSearchParams(parsedParams)
      url += `?${paramsString.toString()}`
    }

    const response = await fetch(url, {
      method,
      cache: cacheConfig?.cache,
      signal: createTimeoutSignal(timeoutMs),
      next: {
        revalidate: cacheConfig?.revalidate,
        tags: [path.replace('/', '')],
      },
    })

    if (!response.ok) {
      throw new Error('Error fetching data', { cause: response.status })
    }

    const totalCountHeader = response.headers.get('X-Total-Count')
    const totalCount = totalCountHeader
      ? Number.parseInt(totalCountHeader, 10)
      : null

    let data: Response
    try {
      data = await response.json()
    } catch {
      throw new Error('Invalid response payload')
    }

    return {
      data,
      totalCount: Number.isNaN(totalCount) ? null : totalCount,
    }
  }
}
