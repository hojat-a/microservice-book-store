import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { BooksProvider, BooksRepository } from './providers';

@Module({
  controllers: [BooksController],
  providers: [BooksService, BooksRepository, ...BooksProvider],
  exports: [BooksRepository]
})
export class BooksModule { }
