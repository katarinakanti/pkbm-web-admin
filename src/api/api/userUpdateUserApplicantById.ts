
import { Gender } from '../model/enum/Gender'
import { UserApplicant } from '../model/table/UserApplicant'

export interface T_userUpdateUserApplicantById_headers {
  authorization: string
}
export interface T_userUpdateUserApplicantById_path {
  id: number
}
export interface T_userUpdateUserApplicantById_body {
  fullname?: string
  email?: string
  phone_number?: string
  address?: string
  gender?: Gender
  birth_date?: number
  birth_place?: string
  religion?: string
}

export type T_userUpdateUserApplicantById = (request: {
  headers: T_userUpdateUserApplicantById_headers
  path: T_userUpdateUserApplicantById_path
  body: T_userUpdateUserApplicantById_body
}, base_url?: string) => Promise<UserApplicant>;

export const method = 'put';
export const url_path = '/user/applicant/:id';
export const alias = 'userUpdateUserApplicantById';
