import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { hashingConstants } from './constants';
import { SignInDto } from './dto';
import { UserRepository } from 'src/users/providers/users.repository';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
  ) { }

  async signUp(user: SignInDto) {
    const saltOrRounds = hashingConstants.saltOrRounds;
    const hashedPassword = await bcrypt.hash(user.password, saltOrRounds);
    try {
      await this.userRepository.createUser({
        email: user.email,
        password: hashedPassword,
      });
      return {
        message: 'User account created successfully.',
      };
    }
    catch (error) {
      throw error;
    }
  }

  async signIn(user: SignInDto) {
    try {
      const userData = await this.userRepository.findByUsername(user.email);
      //check user existance
      if (!userData) {
        throw { errorReason: 'Unauthorized' }
      }
      //password match
      const isMatch = await bcrypt.compare(user?.password, userData.password);
      if (!isMatch) {
        throw { errorReason: 'Unauthorized' };
      }
      return { userId: userData._id, role: userData.role };
    } catch (error) {
      throw error;
    }

  }
}
