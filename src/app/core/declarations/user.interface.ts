import { Identifiable } from './identifiable.interface';

export interface User extends Identifiable {
  first_name?: string;
  last_name?: string;
  full_name?: string;
  email?: string;
  about_me?: string;
  avatar?: string;
}
