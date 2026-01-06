
import { ApplicationType } from '../model/enum/ApplicationType'
import { PendidikanTerakhir } from '../model/enum/PendidikanTerakhir'
import { StudentStatus } from '../model/enum/StudentStatus'
import { Application } from '../model/table/Application'

export interface T_userUpdateUserApplicationById_headers {
  authorization: string
}
export interface T_userUpdateUserApplicationById_path {
  id: number
}
export interface T_userUpdateUserApplicationById_body {
  id_user_applicant?: number
  application_type?: ApplicationType
  nisn?: string
  nik?: string
  parent_dad_fullname?: string
  parent_mom_fullname?: string
  parent_phone?: string
  parent_email?: string
  pendidikan_terakhir?: PendidikanTerakhir
  grade_terakhir?: string
  asal_sekolah?: string
  student_status?: StudentStatus
  alasan_pindah?: string
  kk_url?: string
  akta_lahir_url?: string
  ktp_ortu_url?: string
  photo_url?: string
  selfie_url?: string
  ijazah_terakhir_url?: string
  raport_url?: string
  surat_pindah_url?: string
}

export type T_userUpdateUserApplicationById = (request: {
  headers: T_userUpdateUserApplicationById_headers
  path: T_userUpdateUserApplicationById_path
  body: T_userUpdateUserApplicationById_body
}, base_url?: string) => Promise<Application | null>;

export const method = 'put';
export const url_path = '/user/application/:id';
export const alias = 'userUpdateUserApplicationById';
