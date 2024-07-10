import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { BooksModule } from 'src/books/books.module';
import { redlockProvider } from './providers';

@Module({
  imports: [BooksModule],
  controllers: [CartController],
  providers: [CartService, redlockProvider]
})
export class CartModule {}
