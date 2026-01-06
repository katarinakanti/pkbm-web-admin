
import { Admin } from '../model/table/Admin'

export interface T_loginAdmin_body {
  email: string
  password: string
}
interface ReturnType_0 {
  token: string
  admin: Admin
}

export type T_loginAdmin = (request: {
  body: T_loginAdmin_body
}, base_url?: string) => Promise<ReturnType_0>;

export const method = 'post';
export const url_path = '/admin/login';
export const alias = 'loginAdmin';
