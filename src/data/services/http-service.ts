export interface HTTPRequestConfig {
  path: string
  params?: Record<string, string | number>
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
}

const BASE_URL = 'http://localhost:3000'

export class HTTPService {
  static async request<Response>(config: HTTPRequestConfig): Promise<Response> {
    const { path, method, params } = config

    let url = `${BASE_URL}${path}`
    if (params) {
      const parsedParams = Object.entries(params)
        .filter(([_key, value]) => !!value)
        .map(([key, value]) => ({ key, value: String(value) }))
        .reduce((acc, { key, value }) => ({ ...acc, [key]: value }), {})

      const paramsString = new URLSearchParams(parsedParams)
      url += `?${paramsString.toString()}`
    }

    const response = await fetch(url, { method })
    if (!response.ok) {
      throw new Error('Error fetching data', { cause: response.status })
    }
    return response.json()
  }
}
