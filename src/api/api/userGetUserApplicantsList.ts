
import { UserApplicant } from '../model/table/UserApplicant'

export interface T_userGetUserApplicantsList_headers {
  authorization: string
}

export type T_userGetUserApplicantsList = (request: {
  headers: T_userGetUserApplicantsList_headers
}, base_url?: string) => Promise<UserApplicant[]>;

export const method = 'get';
export const url_path = '/user/applicants';
export const alias = 'userGetUserApplicantsList';
