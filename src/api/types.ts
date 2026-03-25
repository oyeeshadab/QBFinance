export interface LoginResponse {
  token: string;
  refreshToken: string;
}

export interface Transaction {
  id: string;
  amount: number;
  title: string;
}
