type IBaseUser = Record<string, unknown>;
export interface IUser extends IBaseUser {
  id: string;
  name: string;
  login: string;
  password: string;
}

export type UserID = string;
