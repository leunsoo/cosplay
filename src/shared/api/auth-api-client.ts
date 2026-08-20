import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';
import { getApiConfig } from './api-config';
import { type ApiResponse } from './response';

class AuthApiClient {
  private client: AxiosInstance;

  constructor() {
    const config = getApiConfig();
    this.client = axios.create({
      baseURL: config.baseURL,
      timeout: config.timeout.default,
      headers: config.headers,
      withCredentials: true,
    });

    this.client.interceptors.response.use(
      (response: AxiosResponse) => response.data
    );
  }

  get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return this.client.get<ApiResponse<T>>(url, config) as any;
  }

  post<T>(
    url: string,
    data?: any,
    config?: InternalAxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    return this.client.post<ApiResponse<T>>(url, data, config) as any;
  }

  put<T>(
    url: string,
    data?: any,
    config?: InternalAxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    return this.client.put<ApiResponse<T>>(url, data, config) as any;
  }

  patch<T>(
    url: string,
    data?: any,
    config?: InternalAxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    return this.client.patch<ApiResponse<T>>(url, data, config) as any;
  }

  delete<T>(
    url: string,
    config?: InternalAxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    return this.client.delete<ApiResponse<T>>(url, config) as any;
  }
}

export const authApiClient = new AuthApiClient();
