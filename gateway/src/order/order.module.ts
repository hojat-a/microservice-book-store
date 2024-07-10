import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import {
  ClientsModule,
  Transport
} from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'ORDER_PACKAGE',
        useFactory: () => ({
          transport: Transport.TCP,
          options: {
            host: process.env.ORDER_SERVICE_HOST,
            port: +process.env.ORDER_SERVICE_PORT
          }
        })
      },
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule { }
