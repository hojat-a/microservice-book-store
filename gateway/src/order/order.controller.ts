import {
  Controller,
  Get,
  Post,
  Body,
  Param
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Payload } from 'src/common/decorators';

@Controller({path: 'order', version: '1'})
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Post()
  create(@Body() {orderId}: {orderId: string}, @Payload() { userId }: { userId: string }) {
    return this.orderService.create({orderId, userId});
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

}
