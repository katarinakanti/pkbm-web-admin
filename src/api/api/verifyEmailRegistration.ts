

export interface T_verifyEmailRegistration_body {
  email: string
  verification_token: string
}

export type T_verifyEmailRegistration = (request: {
  body: T_verifyEmailRegistration_body
}, base_url?: string) => Promise<boolean>;

export const method = 'post';
export const url_path = '/verify-registration-email';
export const alias = 'verifyEmailRegistration';
