import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserCreationDto } from '../schemas/dtos';

@Entity({ name: 'users' })
export class User {
  static fromRawUser(user: UserCreationDto) {
    const userEntity = new User();
    userEntity.name = user.name;
    userEntity.email = user.email;
    userEntity.password = user.password;
    userEntity.last_name = user.last_name;
    userEntity.username = user.username;
    userEntity.phone_number = user.phone_number;
    return userEntity;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  password?: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  last_name: string;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  phone_number?: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn() // Columna para la fecha de actualización, se actualiza automáticamente
  updated_at: Date;
}
