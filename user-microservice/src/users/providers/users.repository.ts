import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UserRepository {
  constructor(@Inject('USER_MODEL') private userModel) { }

  async createUser(createUserDto: CreateUserDto) {
    try {
      let newUser = new this.userModel(createUserDto);
      return await newUser.save();
    } catch (error) {
      //add log
      //duplicated user error
      if (error.code === 11000) {
        throw { errorReason: 'duplicate' }
      }
      //database error
      throw error;
    }

  }

  async findByUsername(username: string) {
    const user = await this.userModel.findOne({ email: username }).lean();
    return user;
  }
}