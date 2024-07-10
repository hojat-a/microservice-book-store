import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [AuthController],
  imports: [
    UsersModule
  ],
  providers: [
    AuthService,
  ],
  exports: [],
})
export class AuthModule {}
