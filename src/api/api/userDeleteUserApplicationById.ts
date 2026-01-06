

export interface T_userDeleteUserApplicationById_headers {
  authorization: string
}
export interface T_userDeleteUserApplicationById_path {
  id: number
}

export type T_userDeleteUserApplicationById = (request: {
  headers: T_userDeleteUserApplicationById_headers
  path: T_userDeleteUserApplicationById_path
}, base_url?: string) => Promise<boolean | null>;

export const method = 'delete';
export const url_path = '/user/application/:id';
export const alias = 'userDeleteUserApplicationById';
