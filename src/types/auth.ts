export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user: {
    id: number;
    email: string;
    username: string;
    role_id: number;
  };
}

export interface DecodedToken {
  exp: number;
  username: string;
  [key: string]: any;
}