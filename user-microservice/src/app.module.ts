import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'config.dev',
    }),
    AuthModule,
    UsersModule,
    DatabaseModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
