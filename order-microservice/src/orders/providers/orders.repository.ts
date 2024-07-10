import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class OrderRepository {
  constructor(@Inject('ORDER_MODEL') private orders) { }

  async createOrder(createOrderDto) {
    const newOrder = await new this.orders(createOrderDto);
    return newOrder.save();
  }

  async editOrder(orderId, userId, updateOrderDto) {
    try {
      return await this.orders.findOneAndUpdate({ _id: orderId, userId }, updateOrderDto, { new: true })
    } catch (error) {
      throw { errorReason: 'NotFound' }
    }
  }

  async getAllOrders(userId, { page = 1, pageSize = 10 }) {
    const orders = await this.orders.find(
      { userId },
      null,
      { skip: (page - 1) * pageSize, limit: pageSize }
    ).exec();
    return orders;
  }

  async getOneOrder(orderId, userId) {
    const order = await this.orders.findOne({ _id: orderId, userId });
    return order;
  }
}