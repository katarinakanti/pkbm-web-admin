
import { ApplicationType } from '../model/enum/ApplicationType'
import { PendidikanTerakhir } from '../model/enum/PendidikanTerakhir'
import { StudentStatus } from '../model/enum/StudentStatus'
import { Application } from '../model/table/Application'

export interface T_userCreateApplication_headers {
  authorization: string
}
export interface T_userCreateApplication_body {
  id_user: number
  id_user_applicant: number
  application_type: ApplicationType
  nisn?: string
  nik: string
  parent_fullname: string
  parent_phone: string
  parent_email: string
  pendidikan_terakhir: PendidikanTerakhir
  grade_terakhir: string
  asal_sekolah: string
  student_status: StudentStatus
  alasan_pindah?: string
  kk_url: string
  akta_lahir_url: string
  ktp_ortu_url: string
  photo_url: string
  selfie_url: string
  ijazah_terakhir_url?: string
  raport_url?: string
  surat_pindah_url?: string
}

export type T_userCreateApplication = (request: {
  headers: T_userCreateApplication_headers
  body: T_userCreateApplication_body
}, base_url?: string) => Promise<Application | null>;

export const method = 'post';
export const url_path = '/user/application';
export const alias = 'userCreateApplication';
