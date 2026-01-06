
import { User } from '../model/table/User'

export interface T_loginUser_body {
  email: string
  password: string
}
interface ReturnType_0 {
  token: string
  user: User
}

export type T_loginUser = (request: {
  body: T_loginUser_body
}, base_url?: string) => Promise<ReturnType_0>;

export const method = 'post';
export const url_path = '/login';
export const alias = 'loginUser';
