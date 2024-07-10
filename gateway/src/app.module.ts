import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';
import { CommonModule } from './common/common.module';
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
    AuthModule,
    OrderModule,
    CommonModule,
    DatabaseModule,
    BooksModule,
    CartModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
