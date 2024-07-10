import {
  Body,
  Controller,
  Post,
  Get,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto';
import { Payload, Public } from '../common/decorators';
import { JoiValidationPipe } from 'src/common/pipes/validation.pipe';
import { signInSchema } from './schemas';

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Public()
  @Post('signIn')
  async signIn(@Body(new JoiValidationPipe(signInSchema)) authDto: SignInDto) {
    try {
      return await this.authService.signIn(authDto);
    } catch (error) {
      if (error.details === 'Unauthorized') {
        throw new HttpException({
          status: HttpStatus.UNAUTHORIZED,
          error : error.errorReason,
          message: 'Username/Password is not Valid',
        }, HttpStatus.UNAUTHORIZED);
      }
      else {
        throw error;
      }
    }

  }

  @Public()
  @Post('signUp')
  async signUp(@Body(new JoiValidationPipe(signInSchema)) authDto: SignInDto) {
    try {
      return await this.authService.signUp(authDto);
    } catch (error) {
      if (error.details === 'duplicate') {
        throw new HttpException({
          status: HttpStatus.CONFLICT,
          message: 'User exist',
          error: error.errorReason,
        }, HttpStatus.CONFLICT);
      }
      else {
        throw error;
      }
    }

  }

  @Post('logOut')
  logOut(@Payload() payload: {tokenId: string, userId: string}) {
    return this.authService.logOut(payload);
  }
}
