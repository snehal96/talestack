import axios from 'axios'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import apiRoutes from './apiRoutes'

class HttpService {
  private http: any

  constructor() {
    this.http = axios.create({
      withCredentials: false
    })
  }

  token = localStorage.getItem('token') ?? ''
  headers = {
    Authorization: `Bearer ${this.token}`,
    'Content-Type': 'application/json'
  }

  getCurrentUser = () => {
    return new Promise((resolve, reject) => {
      const removeListener = onAuthStateChanged(
        getAuth(),
        (user) => {
          removeListener()
          resolve(user)
        },
        reject
      )
    })
  }

  async get(endpoint: string, params?: any): Promise<any> {
    try {
      const baseURL = apiRoutes.baseUrl
      const response: any = await this.http.get(`${baseURL}/${endpoint}`, {
        params,
        headers: this.headers
      })
      return response.data
    } catch (error) {
      throw new Error(`GET ${endpoint} failed: ${(error as any).message}`)
    }
  }

  async post(endpoint: string, data: any, headers?: Object): Promise<any> {
    try {
      const baseURL = apiRoutes.baseUrl
      const response: any = await this.http.post(`${baseURL}/${endpoint}`, data, {
        headers: {
          ...this.headers,
          ...headers
        }
      })
      return response.data
    } catch (error) {
      throw new Error(`POST ${endpoint} failed: ${(error as any).message}`)
    }
  }

  async put(endpoint: string, data: any, headers?: Object): Promise<any> {
    try {
      const baseURL = apiRoutes.baseUrl
      const response: any = await this.http.put(`${baseURL}/${endpoint}`, data, {
        headers: {
          ...this.headers,
          ...headers
        }
      })
      return response.data
    } catch (error) {
      throw new Error(`PUT ${endpoint} failed: ${(error as any).message}`)
    }
  }

  async delete(endpoint: string, data: any): Promise<any> {
    try {
      const baseURL = apiRoutes.baseUrl
      const response: any = await this.http.delete(`${baseURL}/${endpoint}`, data, {
        headers: this.headers
      })
      return response.data
    } catch (error) {
      throw new Error(`DELETE ${endpoint} failed: ${(error as any).message}`)
    }
  }
}

export default new HttpService()
