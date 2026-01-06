
import { User } from '../model/table/User'

export interface T_registerNewUser_body {
  fullname: string
  email: string
  phone_number: string
  password: string
}
interface ReturnType_0 {
  token: string
  user: User
}

export type T_registerNewUser = (request: {
  body: T_registerNewUser_body
}, base_url?: string) => Promise<ReturnType_0>;

export const method = 'post';
export const url_path = '/register';
export const alias = 'registerNewUser';
