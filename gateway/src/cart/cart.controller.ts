import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { CartService } from './cart.service';
import { Payload } from 'src/common/decorators';

@Controller({ path: 'cart', version: '1' })
export class CartController {
  constructor(private readonly cartService: CartService) { }

  @Post()
  async create(
    @Body() { bookId, count }: { bookId: string, count: number },
    @Payload() { userId }: { userId: string }) {
    try {
      return await this.cartService.create({ bookId, userId, count });
    } catch (error) {
      if(error.message) {
        throw new HttpException({
          error: error.message,
          message: 'book not found.'
        }, HttpStatus.NOT_FOUND)
      }
      throw error
    }
  }

  @Get()
  findAll(@Payload() { userId }: { userId: string }) {
    return this.cartService.findAll(userId);
  }

  @Delete(':bookId')
  remove(
    @Param('bookId') bookId: string,
    @Payload() { userId }: { userId: string }
  ) {
    return this.cartService.remove({ bookId, userId });
  }
}
