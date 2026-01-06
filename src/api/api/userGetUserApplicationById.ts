
import { Application } from '../model/table/Application'

export interface T_userGetUserApplicationById_headers {
  authorization: string
}
export interface T_userGetUserApplicationById_path {
  id: number
}

export type T_userGetUserApplicationById = (request: {
  headers: T_userGetUserApplicationById_headers
  path: T_userGetUserApplicationById_path
}, base_url?: string) => Promise<Application | null>;

export const method = 'get';
export const url_path = '/user/application/:id';
export const alias = 'userGetUserApplicationById';
