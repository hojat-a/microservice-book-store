import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';

@Controller()
export class CartController {
  constructor(private readonly cartService: CartService) { }

  @MessagePattern({ cmd: 'addToCart' })
  async create(@Payload() addToCartDto: AddToCartDto) {
    try {
      return await this.cartService.create(addToCartDto);

    } catch (error) {
      if (error.errorReason) {
        throw new RpcException(error.errorReason);
      }
      throw error
    }
  }

  @MessagePattern({ cmd: 'getCart' })
  getCart(@Payload() { userId }: { userId: string }) {
    return this.cartService.findAll(userId);
  }

  @MessagePattern({ cmd: 'deleteFromCart' })
  remove(@Payload() data: { userId: string, bookId: string }) {
    return this.cartService.remove(data);
  }

  @MessagePattern({ cmd: 'reserve' })
  checkout(@Payload() { userId }: { userId: string }) {
    return this.cartService.reserve(userId);
  }
}
