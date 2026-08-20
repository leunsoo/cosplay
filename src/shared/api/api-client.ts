import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';
import { z, ZodError } from 'zod';
import { useAuthStore } from '@/shared/auth';
import { isTokenExpired } from '@/shared/auth';
import { getApiConfig } from './api-config';
import { type ApiResponse } from './response';

export type ReissueFn = () => Promise<{ accessToken: string }>;
export type UnauthorizedFn = () => void;

type RetryRequestConfig = InternalAxiosRequestConfig & { _retry?: boolean };

export class ApiClient {
  private client: AxiosInstance;
  private reissueFn: ReissueFn | null = null;
  private unauthorizedFn: UnauthorizedFn | null = null;
  private refreshPromise: Promise<string> | null = null;

  constructor() {
    const config = getApiConfig();
    this.client = axios.create({
      baseURL: config.baseURL,
      timeout: config.timeout.default,
      headers: config.headers,
    });

    this.setupInterceptors();
  }

  setReissueFn(fn: ReissueFn) {
    this.reissueFn = fn;
  }

  setUnauthorizedFn(fn: UnauthorizedFn) {
    this.unauthorizedFn = fn;
  }

  private setAuthenticated(accessToken: string) {
    useAuthStore.getState().setAuthenticated(accessToken);
  }

  private async refreshAccessToken(): Promise<string> {
    if (!this.reissueFn) {
      throw new Error('Reissue function is not configured');
    }

    if (!this.refreshPromise) {
      this.refreshPromise = this.reissueFn()
        .then(({ accessToken }) => {
          this.setAuthenticated(accessToken);
          return accessToken;
        })
        .finally(() => {
          this.refreshPromise = null;
        });
    }

    return this.refreshPromise;
  }

  private setupInterceptors(): void {
    this.client.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        if (config.url?.includes('/auth/reissue')) {
          return config;
        }

        let accessToken = useAuthStore.getState().accessToken;
        if (accessToken && isTokenExpired(accessToken) && this.reissueFn) {
          try {
            accessToken = await this.refreshAccessToken();
          } catch {
            this.unauthorizedFn?.();
            accessToken = '';
          }
        }

        if (accessToken) {
          config.headers = config.headers ?? {};
          config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
      },
      (error: AxiosError) => Promise.reject(error)
    );

    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error: AxiosError) => {
        if (!error.config) {
          return Promise.reject(error);
        }

        const originalRequest = error.config as RetryRequestConfig;
        const isUnauthorized = error.response?.status === 401;

        if (isUnauthorized && !originalRequest._retry && this.reissueFn) {
          originalRequest._retry = true;

          try {
            const accessToken = await this.refreshAccessToken();
            originalRequest.headers = originalRequest.headers ?? {};
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return this.client(originalRequest);
          } catch {
            this.unauthorizedFn?.();
          }
        }

        return Promise.reject(error);
      }
    );
  }

  /**
   * HTTP GET - ApiResponse<T> 반환
   */
  async get<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.client.get<ApiResponse<T>>(url, config);
    return response.data;
  }

  /**
   * HTTP POST - ApiResponse<T> 반환
   */
  async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.client.post<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  /**
   * HTTP PUT - ApiResponse<T> 반환
   */
  async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.client.put<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  /**
   * HTTP PATCH - ApiResponse<T> 반환
   */
  async patch<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.client.patch<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  /**
   * HTTP DELETE - ApiResponse<T> 반환
   */
  async delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.client.delete<ApiResponse<T>>(url, config);
    return response.data;
  }

  private parseWithLog<T>(
    schema: z.ZodSchema<T>,
    data: unknown,
    url: string
  ): T {
    try {
      return schema.parse(data);
    } catch (err) {
      if (err instanceof ZodError) {
        console.error(`[ZodError] ${url}`, err.issues);
      }
      throw err;
    }
  }

  // api 호출 + Zod 검증
  async getWithValidation<T>(
    url: string,
    schema: z.ZodSchema<T>,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.get<unknown>(url, config);
    const validatedData = this.parseWithLog(
      schema,
      response.data,
      `GET ${url}`
    );
    return { ...response, data: validatedData };
  }

  async postWithValidation<T>(
    url: string,
    schema: z.ZodSchema<T>,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.post<unknown>(url, data, config);
    const validatedData = this.parseWithLog(
      schema,
      response.data,
      `POST ${url}`
    );
    return { ...response, data: validatedData };
  }

  async putWithValidation<T>(
    url: string,
    schema: z.ZodSchema<T>,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.put<unknown>(url, data, config);
    const validatedData = this.parseWithLog(
      schema,
      response.data,
      `PUT ${url}`
    );
    return { ...response, data: validatedData };
  }

  async patchWithValidation<T>(
    url: string,
    schema: z.ZodSchema<T>,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.patch<unknown>(url, data, config);
    const validatedData = this.parseWithLog(
      schema,
      response.data,
      `PATCH ${url}`
    );
    return { ...response, data: validatedData };
  }

  async deleteWithValidation<T>(
    url: string,
    schema: z.ZodSchema<T>,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.delete<unknown>(url, config);
    const validatedData = this.parseWithLog(
      schema,
      response.data,
      `DELETE ${url}`
    );
    return { ...response, data: validatedData };
  }
}

export const apiClient = new ApiClient();
