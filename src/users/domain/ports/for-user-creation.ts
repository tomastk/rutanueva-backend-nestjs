import { User } from '../models/User';
import { UserCreationDto } from '../schemas/dtos';

export interface ForUserCreation {
  create(dto: UserCreationDto): Promise<User>;
}
