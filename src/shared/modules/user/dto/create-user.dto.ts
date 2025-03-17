import {UserTypes} from '../../../types/index.js';

export class CreateUserDto {
  public email: string;
  public avatarPath: string;
  public name: string;
  public type: UserTypes;
  public password: string;
}
