import {
  Controller
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { Metadata } from '@grpc/grpc-js';


@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @GrpcMethod('AuthService', 'SignIn')
  async signIn(data: { email: string, password: string }, metaData: Metadata) {
    try {
      return await this.authService.signIn(data);
    } catch (error) {
      if (error.errorReason === 'Unauthorized') {
        throw new RpcException(error.errorReason)
      }
      else {
        throw new RpcException({ message: 'internal server error', code:13})
      }
    }

  }

  @GrpcMethod('AuthService', 'SignUp')
  async signUp(data: { email: string, password: string }, metaData: Metadata) {
    try {
      return await this.authService.signUp(data);
    } catch (error) {
      if (error.errorReason === 'duplicate') {
        throw new RpcException({message: error.errorReason, code:6})
      }
      else {
        throw new RpcException({ message: 'internal server error', code:13})
      }
    }

  }
}
