
import { Application } from '../model/table/Application'

export interface T_adminGetApplicationById_headers {
  authorization: string
}
export interface T_adminGetApplicationById_path {
  id: number
}

export type T_adminGetApplicationById = (request: {
  headers: T_adminGetApplicationById_headers
  path: T_adminGetApplicationById_path
}, base_url?: string) => Promise<Application>;

export const method = 'get';
export const url_path = '/admin/application/:id';
export const alias = 'adminGetApplicationById';
