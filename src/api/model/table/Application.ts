import { User } from '../../model/table/User'
import { UserApplicant } from '../../model/table/UserApplicant'
import { ApplicationStatus } from '../../model/enum/ApplicationStatus'
import { ApplicationType } from '../../model/enum/ApplicationType'
import { PendidikanTerakhir } from '../../model/enum/PendidikanTerakhir'
import { StudentStatus } from '../../model/enum/StudentStatus'
import { Admin } from '../../model/table/Admin'

export interface Application {
  id: number;
  id_user: number;
  otm_id_user?: User;
  id_user_applicant: number;
  otm_id_user_applicant?: UserApplicant;
  status_application: ApplicationStatus;
  application_type: ApplicationType;
  nisn?: string;
  nik: string;
  parent_fullname: string;
  parent_phone: string;
  parent_email: string;
  pendidikan_terakhir: PendidikanTerakhir;
  grade_terakhir: string;
  asal_sekolah: string;
  student_status: StudentStatus;
  alasan_pindah?: string;
  kk_url: string;
  akta_lahir_url: string;
  ktp_ortu_url: string;
  photo_url: string;
  selfie_url: string;
  ijazah_terakhir_url?: string;
  raport_url?: string;
  surat_pindah_url?: string;
  created_at: Date;
  verified_at?: Date;
  verified_by?: number;
  otm_verified_by?: Admin;
  notes?: string;
  updated_at?: Date;
  payment_status?: boolean;
  payment_verification_status?: boolean;
  paid_at?: Date;
  payment_proof_url?: string;
}