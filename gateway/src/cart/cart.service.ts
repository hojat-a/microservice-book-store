import {
  Injectable,
  Inject
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CartService {
  constructor(
    @Inject('INVENTORY_PACKAGE') private readonly inventory: ClientProxy
  ) { }

  async create(data: { bookId: string, userId: string, count: number }) {
    return await firstValueFrom(
      this.inventory.send(
        {
          cmd: 'addToCart'
        },
        data
      )
    );
  }

  async findAll(userId: string) {
    const books = await firstValueFrom(
      this.inventory.send(
        {
          cmd: 'getCart'
        },
        {userId}
      )
    );
    return books;
  }

  async remove(data: { bookId: string, userId: string }) {
    return await firstValueFrom(
      this.inventory.send(
        {
          cmd: 'deleteFromCart'
        },
        data
      )
    );
  }
}
