import { User } from '../models/User';

export interface ForUserQuerying {
  findById(id: string): Promise<User>;
  findAll(): Promise<User[]>;
}
