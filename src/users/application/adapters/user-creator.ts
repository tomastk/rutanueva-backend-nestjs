import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/domain/models/User';
import { ForUserCreation } from 'src/users/domain/ports/for-user-creation';
import { UserCreationDto } from 'src/users/domain/schemas/dtos';
import { Repository } from 'typeorm';

@Injectable()
export class UserCreator implements ForUserCreation {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(user: UserCreationDto): Promise<User> {
    const userEntity = User.fromRawUser(user);
    try {
      return await this.userRepository.save(userEntity);
    } catch (err) {
      // Maneja errores de llave duplicada
      if (err.code === '23505') {
        // Código de error para violación de unicidad en PostgreSQL
        throw new HttpException(
          'El nombre de usuario o email ya está registrado.',
          HttpStatus.BAD_REQUEST,
        );
      }
      // Maneja otros errores genéricos
      throw new HttpException(
        'Error al crear el usuario.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
