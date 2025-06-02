export interface IUser {
  username: string;
  password: string;
  role?: string;
  shops: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserLogin {
  username: string;
  password: string;
  rememberMe?: boolean;
}

export interface IDecodedUser {
  id: string;
  username: string;
  role: string;
  iat: number;
  exp: number;
}
