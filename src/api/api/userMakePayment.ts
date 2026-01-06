
import { Application } from '../model/table/Application'

export interface T_userMakePayment_headers {
  authorization: string
}
export interface T_userMakePayment_path {
  id: number
}

export type T_userMakePayment = (request: {
  headers: T_userMakePayment_headers
  path: T_userMakePayment_path
}, base_url?: string) => Promise<Application>;

export const method = 'put';
export const url_path = '/user/application/payment/:id';
export const alias = 'userMakePayment';
