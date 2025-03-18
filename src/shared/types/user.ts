export enum UserTypes {
  Pro = 'pro',
  Normal = 'normal',
}

export interface User {
  email: string;
  password?: string;
  name: string;
  type: UserTypes;
  avatarPath: string;
}
