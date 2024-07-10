import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { usersProviders, UserRepository } from './providers';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService, UserRepository, ...usersProviders],
  exports: [UserRepository]
})
export class UsersModule { }
