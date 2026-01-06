

export interface T_userDeleteUserApplicantById_headers {
  authorization: string
}
export interface T_userDeleteUserApplicantById_path {
  id: number
}

export type T_userDeleteUserApplicantById = (request: {
  headers: T_userDeleteUserApplicantById_headers
  path: T_userDeleteUserApplicantById_path
}, base_url?: string) => Promise<boolean | null>;

export const method = 'delete';
export const url_path = '/user/applicant/:id';
export const alias = 'userDeleteUserApplicantById';
