import { User } from '../models/User';

export type UserCreationDto = Pick<
  User,
  'email' | 'password' | 'last_name' | 'phone_number' | 'username' | 'name'
>;
