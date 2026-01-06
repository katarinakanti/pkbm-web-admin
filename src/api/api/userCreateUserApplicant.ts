
import { Gender } from '../model/enum/Gender'
import { UserApplicant } from '../model/table/UserApplicant'

export interface T_userCreateUserApplicant_headers {
  authorization: string
}
export interface T_userCreateUserApplicant_body {
  fullname: string
  email: string
  phone_number: string
  address?: string
  gender: Gender
  birth_date: number
  birth_place?: string
  religion?: string
}

export type T_userCreateUserApplicant = (request: {
  headers: T_userCreateUserApplicant_headers
  body: T_userCreateUserApplicant_body
}, base_url?: string) => Promise<UserApplicant>;

export const method = 'post';
export const url_path = '/user/applicant';
export const alias = 'userCreateUserApplicant';
