import axios, { AxiosRequestConfig } from 'axios';
import { requestFailFunc, requestSuccessFunc, responseFailFunc, responseSuccessFunc } from './interceptors';
import { AXIOS_DEFAULT_CONFIG } from '../../config';
import local from '../local';

const axiosInstance = axios.create(AXIOS_DEFAULT_CONFIG);
axiosInstance.interceptors.request.use(requestSuccessFunc, requestFailFunc);
axiosInstance.interceptors.response.use(responseSuccessFunc, responseFailFunc);

export interface IRequestResponse<T = any> {
  data: T;
  code: number;
  message: string;
  success: boolean;
}
export interface ICache {
  callback?: Function;
  time?: number;
  version?: string;
}

export default async function request(
  url: string,
  config?: AxiosRequestConfig,
  cache?: ICache,
): Promise<IRequestResponse> {
  const method = config?.method ? config.method.toUpperCase() : 'GET';
  const params = config?.method ? config.params : config?.data;
  const key = `[${method}] ${url} ${JSON.stringify(params)}`;
  if (cache?.callback) {
    cache?.callback(local.get(key, cache.version));
  }
  const res = await axiosInstance({
    url,
    ...config,
  });
  if (cache?.callback) {
    local.set(key, res.data, { cachetime: cache.time, version: cache.version });
  }
  return res.data;
}

export function getRequest(url: string, params?: object, cache?: ICache): Promise<IRequestResponse> {
  return request(
    url,
    {
      method: 'GET',
      params,
    },
    cache,
  );
}

export function postRequest(url: string, data?: object, cache?: ICache): Promise<IRequestResponse> {
  return request(
    url,
    {
      method: 'POST',
      data,
    },
    cache,
  );
}
export function uploadRequest(url: string, formData: FormData, onUploadProgress?: (progress: number) => void) {
  return request(url, {
    method: 'POST',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress(progressEvent: any) {
      const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total) || 0;
      if (percentage < 100) {
        console.log(`${percentage}%`); // 上传进度
      }
      // eslint-disable-next-line no-unused-expressions
      onUploadProgress && onUploadProgress(percentage);
    },
  });
}
