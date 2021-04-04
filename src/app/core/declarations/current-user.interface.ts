import { User } from './user.interface';

export interface CurrentUser {
  token: string;
  tokenExpiry: string;
  user?: User;
}
