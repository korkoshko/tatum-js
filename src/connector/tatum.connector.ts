import axios from 'axios'
import { Constant } from '../util/constant'
import { Container, Service } from 'typedi'
import { version } from '../../package.json'
import { CONFIG } from '../util/di.tokens'
import { GetUrl, Request } from './connector.dto'
import { Network } from '../service/tatum/tatum.dto'

axios.interceptors.request.use((request) => {
  const config = Container.get(CONFIG)
  if (config.debug) {
    console.log('Request', request.method?.toUpperCase(), request.url, request.data !== undefined ? JSON.stringify(request.data) : '')
  }
  return request
})

axios.interceptors.response.use(
  (response) => {
    const config = Container.get(CONFIG)
    if (config.debug) {
      console.log('Response:', response.status, JSON.stringify(response.data))
    }
    return response
  }, (error) => {
    const { config, message, response } = error

    const { debug } = Container.get(CONFIG)

    if (debug) {
      console.warn('Error: ', message, JSON.stringify(response.data))
    }

    if (!config || !config.retry) {
      return Promise.reject(error)
    }

    // retry while Network timeout or Network Error
    if (!(message.includes('timeout') || message.includes('Network Error') || response.status === 429)) {
      return Promise.reject(error)
    }

    config.retry -= 1
    const delayRetryRequest = new Promise<void>((resolve) => {
      setTimeout(() => {

        if (debug) {
          console.warn('Retry the request: ', config.url, JSON.stringify(config.data))
        }

        resolve()
      }, config.retryDelay || 1000)
    })
    return delayRetryRequest.then(() => axios(config))

  })

@Service()
/* eslint-disable */ //TODO implement correct typings and remove any
export class TatumConnector {
  public async get<T = any>({ path, params }: GetUrl) {
    return this.request<T>({ path, params, method: 'GET' })
  }

  public async post<T = any>({ path, params, body }: Request) {
    return this.request<T>({ path, params, body, method: 'POST' })
  }

  public async delete<T = any>({ path, params }: GetUrl) {
    return this.request<T>({ path, params, method: 'DELETE' })
  }

  private async request<T>({ path, params, body, method }: Request): Promise<T> {
    const { retryDelay, retryCount } = Container.get(CONFIG)

    const headers = this.headers()
    const { data } = await axios.request({
      url: this.getUrl({ path, params }),
      headers,
      method,
      data: body,
      // @ts-ignore
      retry: retryCount,
      retryDelay: retryDelay,
    })
    return data as T
  }

  private getUrl({ path, params }: GetUrl) {
    const url = new URL(path, process.env.TATUM_API_URL ?? Constant.TATUM_API_URL)

    if (params) {
      Object.keys(params)
        .filter((key) => params[key] !== undefined && params[key] !== null)
        .forEach((key) => url.searchParams.append(key, params[key]!))
    }

    const config = Container.get(CONFIG)

    if (!config.apiKey && config.network === Network.Testnet) {
      url.searchParams.append('type', 'testnet')
    }

    return url.toString()
  }

  private headers() {
    const headers = {
      'Content-Type': 'application/json',
      'User-Agent': `Tatum_SDK_JS/${version}`,
    }
    const config = Container.get(CONFIG)

    return {
      ...headers,
      ...(config.apiKey && { 'x-api-key': config.apiKey }),
    }
  }
}
