import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { OrderProvider, OrderRepository, redlock } from './providers';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'INVENTORY_PACKAGE',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 3001
        },
      },
    ]),
    ClientsModule.register([
      {
        name: 'BOOK_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5673'],
          queue: 'books_queue',
          queueOptions: {
            durable: false
          },
        },
      },
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrderRepository, redlock, ...OrderProvider]
})
export class OrdersModule { }
