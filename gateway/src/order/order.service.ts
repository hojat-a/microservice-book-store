import {
  Injectable,
  Inject
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class OrderService {
  constructor(
    @Inject('ORDER_PACKAGE') private readonly order: ClientProxy
  ) { }
  async create(createOrderDto: CreateOrderDto) {
    return await firstValueFrom(
      this.order.send(
        {
          cmd: 'createOrder'
        },
        createOrderDto
      )
    );
  }

  findAll() {
    return `This action returns all order`;
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
