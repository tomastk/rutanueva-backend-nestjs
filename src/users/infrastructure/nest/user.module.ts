import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/domain/models/User';
import { UserController } from './user.controller';
import { UserCreator } from 'src/users/application/adapters/user-creator';
import { UserQuerier } from 'src/users/application/adapters/user-querier';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserCreator, UserQuerier],
  exports: [],
})
export class UserModule {}
