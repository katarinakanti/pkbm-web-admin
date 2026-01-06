
import { Admin } from '../model/table/Admin'

export interface T_registerAdmin_body {
  fullname: string
  email: string
  password: string
}
interface ReturnType_0 {
  token: string
  admin: Admin
}

export type T_registerAdmin = (request: {
  body: T_registerAdmin_body
}, base_url?: string) => Promise<ReturnType_0>;

export const method = 'post';
export const url_path = '/admin/register';
export const alias = 'registerAdmin';
