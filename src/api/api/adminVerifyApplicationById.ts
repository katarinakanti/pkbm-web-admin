
import { Application } from '../model/table/Application'

export interface T_adminVerifyApplicationById_headers {
  authorization: string
}
export interface T_adminVerifyApplicationById_path {
  id_application: number
}
export interface T_adminVerifyApplicationById_body {
  notes?: string
}

export type T_adminVerifyApplicationById = (request: {
  headers: T_adminVerifyApplicationById_headers
  path: T_adminVerifyApplicationById_path
  body: T_adminVerifyApplicationById_body
}, base_url?: string) => Promise<Application>;

export const method = 'put';
export const url_path = '/admin/application/:id_application';
export const alias = 'adminVerifyApplicationById';
