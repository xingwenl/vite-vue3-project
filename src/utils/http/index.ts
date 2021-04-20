import axios, { AxiosRequestConfig } from 'axios';
import { requestFailFunc, requestSuccessFunc, responseFailFunc, responseSuccessFunc } from './interceptors';
import { AXIOS_DEFAULT_CONFIG } from '../../config';

const axiosInstance = axios.create(AXIOS_DEFAULT_CONFIG);
axiosInstance.interceptors.request.use(requestSuccessFunc, requestFailFunc);
axiosInstance.interceptors.response.use(responseSuccessFunc, responseFailFunc);

export interface IRequestResponse<T = any> {
  data: T;
  code: number;
  message: string;
  success: boolean;
}

export default function request(url: string, config?: AxiosRequestConfig): Promise<IRequestResponse> {
  return axiosInstance({
    url,
    ...config,
  }).then(res => res.data);
}

export function getRequest(url: string, params?: object): Promise<IRequestResponse> {
  return request(url, {
    method: 'get',
    params,
  });
}

export function postRequest(url: string, data?: object): Promise<IRequestResponse> {
  return request(url, {
    method: 'post',
    data,
  });
}
export function uploadRequest() {}
