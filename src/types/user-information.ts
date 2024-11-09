export interface UserInformation {
  instance_id: string;
  id: string;
  aud: string;
  role: string;
  email: string;
  encrypted_password: string;
  email_confirmed_at: string;
  invited_at: null;
  confirmation_token: string;
  confirmation_sent_at: null;
  recovery_token: string;
  recovery_sent_at: null;
  email_change_token_new: string;
  email_change: string;
  email_change_sent_at: null;
  last_sign_in_at: null;
  raw_app_meta_data: RawAppMetaData;
  raw_user_meta_data: RawUserMetaData;
  is_super_admin: null;
  created_at: string;
  updated_at: string;
  phone: string;
  phone_confirmed_at: null;
  phone_change: string;
  phone_change_token: string;
  phone_change_sent_at: null;
  confirmed_at: string;
  email_change_token_current: string;
  email_change_confirm_status: number;
  banned_until: null;
  reauthentication_token: string;
  reauthentication_sent_at: null;
  is_sso_user: boolean;
  deleted_at: null;
  is_anonymous: boolean;
}

export interface RawAppMetaData {
  provider: string;
  providers: string[];
}

export interface RawUserMetaData {
  name: string;
  role: string;
  phone: string;
}
