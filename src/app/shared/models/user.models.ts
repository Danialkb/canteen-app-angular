export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

export interface ConfirmationCode {
  session_id: string;
  code: string;
}
