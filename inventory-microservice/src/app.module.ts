import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { BooksModule } from './books/books.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'config.dev',
    }),
    DatabaseModule,
    BooksModule,
    CartModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
