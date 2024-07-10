import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import {
  ClientsModule,
  Transport
} from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'INVENTORY_PACKAGE',
        useFactory: () => ({
          transport: Transport.TCP,
          options: {
            host: process.env.INVENTORY_SERVICE_HOST,
            port: +process.env.INVENTORY_SERVICE_PORT
          }
        }),
      },
    ]),
  ],
  controllers: [CartController],
  providers: [CartService]
})
export class CartModule { }
