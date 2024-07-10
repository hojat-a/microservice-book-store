import { Injectable, Inject } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
@Injectable()
export class OrdersService {
  constructor(
    @Inject('INVENTORY_PACKAGE') private readonly inventory: ClientProxy,
    @Inject('BOOK_SERVICE') private client: ClientProxy,
    @Inject('REDIS_CONNECTION') private readonly redis
  ) { }
  async payment({ userId, orderId }: { userId: string , orderId}) {

    try {
      const books = await firstValueFrom(
        this.inventory.send({
          cmd: 'reserve'
        },
          {userId})
      );
        //create order with pending status
        //redirect to payment gateway
    } catch (error) {
      throw error
    }
  }

  successPayment() {
    this.client.emit('order-fulfilled', { message: {task:'test'} }).subscribe()
    // complete the order
    // finalize the stock => request to remove the reserve and update the database
    // add score
  }
  failedPayment() {
    this.client.emit('order-rejected', { message: {task:'test'} }).subscribe()
    // complete the order
    // finalize the stock => request to remove the reserve
  }
  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
