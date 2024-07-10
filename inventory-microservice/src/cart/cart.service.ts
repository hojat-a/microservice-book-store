import { Inject, Injectable } from '@nestjs/common';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { BooksRepository } from 'src/books/providers';

@Injectable()
export class CartService {
  constructor(
    private readonly booksRepository: BooksRepository,
    @Inject('REDIS_CONNECTION') private readonly redis,
    @Inject('REDLOCK') private readonly redlock
  ) { }
  async create({ userId, bookId, count }: AddToCartDto) {
    const book = await this.booksRepository.getOneBook(bookId);
    if (!book) {
      throw { errorReason: 'BookNotExist' }
    }
    await this.redis.hmset(`cart:${userId}`, bookId, count)
    return 'This action adds a new cart';
  }

  async findAll(userId) {
    const cartData = await this.redis.hgetall(`cart:${userId}`);
    const bookIds = Object.keys(cartData)
    if (bookIds.length == 0) {
      return [];
    }
    const books = await this.booksRepository.getBooksById(bookIds);
    const remainedBooks = this.updateStock(books, cartData, [])
    return remainedBooks;
  }

  async remove({ userId, bookId }) {
    await this.redis.hdel(`cart:${userId}`, bookId)
    return `This action removes a cart`;
  }

  async reserve(userId) {
    let lock;
    try {
      const cartData = await this.redis.hgetall(`cart:${userId}`);
      const bookIds = Object.keys(cartData);
      if (bookIds.length == 0) {
        throw { errorReason: 'cartIsEmpty' }
      }
      //lock books
      const ttl = 5000; // Time to live in ms
      lock = await this.redlock.acquire([bookIds], ttl);
      const books = await this.booksRepository.getBooksById(bookIds);
      const reservedBooks = await this.calculateReservedCount(bookIds)
      const remainedBooks = this.updateStock(books, cartData, reservedBooks);
      for (let book of remainedBooks) {
        if (book.stock <= 0) {
          throw { errorReason: 'InsufficientStock' }
        }
      }
      await this.reserveBooks(cartData, userId);
      //unlock books
      return remainedBooks;

    } catch (error) {
      throw error;
    }
    finally {
      await lock.release();
    }
  }

  private async reserveBooks(bookData, userId) {
    const multi = this.redis.multi(); //redis transaction
    for (let book of bookData) {
      multi.setex(`reserve:${book.id}:${userId}`, 60, book.count)
    }
    await multi.exec();
  }

  private async calculateReservedCount(bookIds) {
    const reservedBooks = {}
    for (let id of bookIds) {
      const reserves = await this.redis.keys(`reserve:${id}:*`)
      let total_count = 0;
      for (const key of reserves) {
        const count = await this.redis.get(key);
        total_count += parseInt(count, 10);
      }
      reservedBooks[id] = total_count;
    }
    return reservedBooks
  }

  private updateStock(stockArray, countObject, reserveObject) {

    // Iterate through stockArray and update the stock
    stockArray.forEach(item => {
      if (countObject[item.id]) {
        item.stock -= countObject[item.id];
      }
      if (reserveObject[item.id]) {
        item.stock -= reserveObject[item.id];
      }
      if (item.stock <= 0) {
        item.stock = 0
      }
      else {
        item.stock = countObject[item.id]
      }
    });
    return stockArray;
  }
}
