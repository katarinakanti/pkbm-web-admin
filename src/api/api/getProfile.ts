
import { User } from '../model/table/User'

export interface T_getProfile_headers {
  authorization: string
}

export type T_getProfile = (request: {
  headers: T_getProfile_headers
}, base_url?: string) => Promise<User>;

export const method = 'get';
export const url_path = '/profile';
export const alias = 'getProfile';
