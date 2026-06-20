// @ts-ignore
import urlcat from 'urlcat'

// 1. 先定义 ApiError 类（放在使用之前）
class ApiError extends Error {
  status: number
  response: Response

  constructor(status: number, message: string, response: Response) {
    super(message)
    this.status = status
    this.response = response
    this.name = 'ApiError'
  }
}

interface RequestOptions {
  method?: string
  params?: Record<string, any>
  body?: Record<string, any>
}

const request = async (url: string, { method = 'GET', params, body }: RequestOptions = {}) => {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL
  const requestUrl = urlcat(apiUrl, url, params)

  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }

  const response = await fetch(requestUrl, {
    method,
    headers,
    ...(body && { body: JSON.stringify(body) }),
  })

  if (!response.ok) {
    const data = await response.json().catch(() => ({}))
    throw new ApiError(response.status, data.message || response.statusText, response)
  }

  return await response.json()
}

export default request

export const get =
    async <T = any,>(url: string, params?: Record<string, any>): Promise<T> => {
  return request(url, { method: 'GET', params })
}

export const post =
    async <T = any,>(
  url: string,
  body?: Record<string, any>,
  params?: Record<string, any>,
): Promise<T> => {
  return request(url, { method: 'POST', params, body })
}

export const put = async <T = any,>(
  url: string,
  body?: Record<string, any>,
  params?: Record<string, any>,
): Promise<T> => {
  return request(url, { method: 'PUT', params, body })
}

export const del = async <T = any,>(url: string, params?: Record<string, any>): Promise<T> => {
  return request(url, { method: 'DELETE', params })
}

export const patch = async <T = any,>(
  url: string,
  body?: Record<string, any>,
  params?: Record<string, any>,
): Promise<T> => {
  return request(url, { method: 'PATCH', params, body })
}
