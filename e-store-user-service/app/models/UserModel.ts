export interface UserModel {
  user_id?: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  password: string;
  salt: string;
  userType: 'BUYER' | 'SELLER';
  profile_pic?: string;
  verification_code?: number;
  expiry?: string;
}
