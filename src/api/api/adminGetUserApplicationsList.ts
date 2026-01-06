
import { ApplicationStatus } from '../model/enum/ApplicationStatus'
import { ApplicationType } from '../model/enum/ApplicationType'
import { StudentStatus } from '../model/enum/StudentStatus'
import { Application } from '../model/table/Application'

export interface T_adminGetUserApplicationsList_headers {
  authorization: string
}
export interface T_adminGetUserApplicationsList_query {
  limit?: number
  offset?: number
  id_user?: number
  id_user_applicant?: number
  application_status?: ApplicationStatus
  application_type?: ApplicationType
  student_status?: StudentStatus
  created_at?: string
  verified_at?: string
}
interface ReturnType_0 {
  total: number
  data: Application[]
}

export type T_adminGetUserApplicationsList = (request: {
  headers: T_adminGetUserApplicationsList_headers
  query: T_adminGetUserApplicationsList_query
}, base_url?: string) => Promise<ReturnType_0>;

export const method = 'get';
export const url_path = '/admin/applications';
export const alias = 'adminGetUserApplicationsList';
