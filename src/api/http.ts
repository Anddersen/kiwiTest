import axios, { AxiosInstance, AxiosRequestConfig, AxiosPromise } from 'axios';

export class Http {
  public request: AxiosInstance;

  public constructor(baseURL: string) {
    this.request = axios.create({
      baseURL: baseURL,
    });
  }

  public get<T>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {
    return this.request.get(url, config);
  }

  public post<T>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T> {
    return this.request.post(url, data, config);
  }

  public put<T>(url: string, data: any, config?: AxiosRequestConfig): AxiosPromise<T> {
    return this.request.put(url, data, config);
  }

  public patch<T>(url: string, data: any, config?: AxiosRequestConfig): AxiosPromise<T> {
    return this.request.patch(url, data, config);
  }

  public delete<T>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {
    return this.request.delete(url, config);
  }
}

export const http = new Http('https://api.skypicker.com/');
