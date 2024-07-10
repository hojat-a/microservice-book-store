import {
  Inject,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto';
import { randomUUID } from 'crypto';
import { ClientGrpc } from '@nestjs/microservices';
import { catchError } from 'rxjs/operators';


@Injectable()
export class AuthService implements OnModuleInit {
  private usersService;

  constructor(
    private jwtService: JwtService,
    @Inject('REDIS_CONNECTION') private redis,
    @Inject('AUTH_PACKAGE') private client: ClientGrpc
  ) { }

  onModuleInit() {
    this.usersService = this.client.getService('AuthService');
  }

  async signUp(user: SignInDto) {
    return this.usersService.signUp({
      email: user.email,
      password: user.password,
    }).toPromise();

  }

  async signIn(user: SignInDto) {
    try {
      const userData = await this.usersService.signIn({ email: user.email, password: user.password }).toPromise();
      const tokenId = this.generateTokenId();
      const tokens = await this.getTokens(userData.userId, userData.role, tokenId);
      return tokens;
    } catch (error) {
      throw error;
    }

  }

  async logOut(payload: { tokenId: string, userId: string }) {
    //add token Id to blacklist
    await this.redis.set(
      process.env["BLOCKED_TOKEN_PREFIX"] + payload.tokenId,
      'OK',
      "EX",
      process.env["ACCESS_TOKEN_TTL_SECONDS"]
    );
    return { message: 'Done' }

  }

  private async getTokens(userId: string, role: string, tokenId: string) {
    try {
      const At = await this.jwtService.signAsync(
          {
            sub: userId,
            role,
            jti: tokenId
          },
          {
            secret: process.env["ACCESS_TOKEN_SECRET"],
            expiresIn: +process.env["ACCESS_TOKEN_TTL_SECONDS"]
          }
        );
      return {
        accessToken: At
      }
    } catch (error) {
      throw error;
    }

  }

  private generateTokenId() {
    const tokenId = randomUUID();
    return tokenId;
  }
}
