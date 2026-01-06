import { User } from '../../model/table/User'
import { Gender } from '../../model/enum/Gender'

export interface UserApplicant {
  id: number;
  id_user: number;
  otm_id_user?: User;
  fullname: string;
  email: string;
  phone_number?: string;
  address?: string;
  gender: Gender;
  birth_date: Date;
  birth_place?: string;
  religion?: string;
}