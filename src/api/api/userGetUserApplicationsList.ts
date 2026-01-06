
import { ApplicationStatus } from '../model/enum/ApplicationStatus'
import { ApplicationType } from '../model/enum/ApplicationType'
import { Application } from '../model/table/Application'

export interface T_userGetUserApplicationsList_headers {
  authorization: string
}
export interface T_userGetUserApplicationsList_query {
  limit?: number
  offset?: number
  id_user_applicant?: number
  status_application?: ApplicationStatus
  application_type?: ApplicationType
  created_at?: string
}
interface ReturnType_0 {
  total: number
  data: Application[]
}

export type T_userGetUserApplicationsList = (request: {
  headers: T_userGetUserApplicationsList_headers
  query: T_userGetUserApplicationsList_query
}, base_url?: string) => Promise<ReturnType_0>;

export const method = 'get';
export const url_path = '/user/applications';
export const alias = 'userGetUserApplicationsList';
