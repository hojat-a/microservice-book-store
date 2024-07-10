import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AtStrategy } from './strategy';
import { AtGuard , RolesGuard} from './guards';
import { APP_GUARD } from '@nestjs/core';

@Module({
  controllers: [AuthController],
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'AUTH_PACKAGE',
        useFactory: () => ({
          transport: Transport.GRPC,
          options: {
            url: process.env.USER_SERVICE_URL,
            package: 'auth',
            protoPath: join(__dirname, '../_proto/auth.proto'),
          },
        }),
      },
    ]),
    PassportModule,
    JwtModule.register({}),
  ],
  providers: [
    AuthService,
    AtStrategy,
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [],
})
export class AuthModule { }