
export interface User {
  id: number;
  fullname: string;
  email: string;
  phone_number?: string;
  password: string;
  email_verification_token: string;
  email_reset_password_token?: string;
  update_email_otp?: string;
  update_email_token?: string;
  verified_at?: Date;
  created_at: Date;
}