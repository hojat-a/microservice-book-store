import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {
  Injectable,
  Inject,
  UnauthorizedException
} from '@nestjs/common';

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt-access') {
  constructor(@Inject('REDIS_CONNECTION') private redis) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env["ACCESS_TOKEN_SECRET"],
    });
  }

  async validate(payload: any) {

    const blockedToken = await this.redis.get(process.env["BLOCKED_TOKEN_PREFIX"] + payload.jti)
    if (blockedToken) {
      throw new UnauthorizedException()
    }
    return { userId: payload.sub, role: payload.role, tokenId: payload.jti };
  }
}
