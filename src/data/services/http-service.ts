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
}

const BASE_URL = 'https://energy-dashboard-api.vercel.app'

export class HTTPService {
  static async request<Response>(config: HTTPRequestConfig): Promise<Response> {
    const { path, method, params, cacheConfig } = config

    let url = `${BASE_URL}${path}`

    if (params) {
      const parsedParams = Object.entries(params)
        .filter(([_key, value]) => !!value)
        .map(([key, value]) => ({ key, value: String(value) }))
        .reduce((acc, { key, value }) => ({ ...acc, [key]: value }), {})

      const paramsString = new URLSearchParams(parsedParams)
      url += `?${paramsString.toString()}`
    }

    const response = await fetch(url, {
      method,
      cache: cacheConfig?.cache,
      next: {
        revalidate: cacheConfig?.revalidate,
        tags: [path.replace('/', '')],
      },
    })
    if (!response.ok) {
      throw new Error('Error fetching data', { cause: response.status })
    }
    return response.json()
  }
}
