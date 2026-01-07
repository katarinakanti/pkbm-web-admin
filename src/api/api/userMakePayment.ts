
import { Application } from '../model/table/Application'

export interface T_userMakePayment_headers {
  authorization: string
}
export interface T_userMakePayment_path {
  id: number
}
export interface T_userMakePayment_body {
  payment_proof_url: string
}

export type T_userMakePayment = (request: {
  headers: T_userMakePayment_headers
  path: T_userMakePayment_path
  body: T_userMakePayment_body
}, base_url?: string) => Promise<Application>;

export const method = 'put';
export const url_path = '/user/application/payment/:id';
export const alias = 'userMakePayment';
