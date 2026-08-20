import type { AxiosRequestConfig } from 'axios';

interface ApiConfig {
  baseURL: string;
  timeout: {
    default: number;
  };
  headers: AxiosRequestConfig['headers'];
}

const apiConfig: ApiConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || '',

  timeout: {
    default: 5000, // 5초
  },

  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
};

export const getApiConfig = (): Readonly<ApiConfig> => ({ ...apiConfig });
