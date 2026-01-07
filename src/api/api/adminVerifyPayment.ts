
import { Application } from '../model/table/Application'

export interface T_adminVerifyPayment_headers {
  authorization: string
}
export interface T_adminVerifyPayment_path {
  id: number
}
export interface T_adminVerifyPayment_body {
  payment_verification_status: boolean
}

export type T_adminVerifyPayment = (request: {
  headers: T_adminVerifyPayment_headers
  path: T_adminVerifyPayment_path
  body: T_adminVerifyPayment_body
}, base_url?: string) => Promise<Application>;

export const method = 'put';
export const url_path = '/admin/application/payment/:id';
export const alias = 'adminVerifyPayment';
