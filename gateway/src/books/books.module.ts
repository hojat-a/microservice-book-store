import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

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
  controllers: [BooksController],
  providers: [BooksService]
})
export class BooksModule { }
