import { Connection } from 'mongoose';
import { OrderModel } from '../models/index';

export const OrderProvider = [
  {
    provide: 'ORDER_MODEL',
    useFactory: (connection: Connection) => connection.model('orders', OrderModel),
    inject: ['DATABASE_CONNECTION'],
  },
];