// External

// Internal
import { IUser } from './users';

export interface IAuthResponse {
  accessToken: string;
  user: IUser;
}
