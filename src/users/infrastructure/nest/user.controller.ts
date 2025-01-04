import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { apiResponseCreator } from 'src/shared/nest/api-response-creator';
import { UserCreator } from 'src/users/application/adapters/user-creator';
import { UserQuerier } from 'src/users/application/adapters/user-querier';
import { UserCreationDto } from 'src/users/domain/schemas/dtos';

@Controller('users')
export class UserController {
  constructor(
    private readonly creator: UserCreator,
    private readonly querier: UserQuerier,
  ) {}
  @Post('')
  async createUser(@Body() dto: UserCreationDto) {
    const createdUser = await this.creator.create(dto);
    return apiResponseCreator.success(createdUser);
  }
  @Get()
  async getAllUsers() {
    return apiResponseCreator.success(await this.querier.findAll());
  }
  @Get('me')
  async getMe(@Req() req: Request) {
    return {
      success: true,
      data: await this.querier.findById(req['userId']),
      error: null,
    };
  }
}
