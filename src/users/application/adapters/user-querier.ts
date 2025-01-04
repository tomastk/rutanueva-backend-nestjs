import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/domain/models/User';
import { ForUserQuerying } from 'src/users/domain/ports/for-user-queriyng';
import { Repository } from 'typeorm';

@Injectable()
export class UserQuerier implements ForUserQuerying {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async findById(userId: string): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        id: Number(userId),
      },
    });
  }
  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }
}
