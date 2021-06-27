type IBaseUser = Record<string, string>;

export interface IUser extends IBaseUser {
  id: string;
  uuid: string;
  name: string;
  login: string;
  password: string;
}

export type UserID = string;
