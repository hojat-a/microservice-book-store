import { Injectable, Inject} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BooksRepository } from './providers';

@Injectable()
export class BooksService {
  constructor(private readonly bookRepository: BooksRepository, @Inject('REDIS_CONNECTION') private readonly redis) {}
  create(createBookDto: CreateBookDto) {
    return 'This action adds a new book';
  }

  findAll(data) {
    return this.bookRepository.getBooks(data);
  }

  async findOne({bookId}: {bookId: string}) {
    const book =  await this.bookRepository.getOneBook(bookId);
    return book || {}
  }

  update(updateBookDto: UpdateBookDto) {
    return this.bookRepository.editDBook(updateBookDto);
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }

  async favorites() {
    let favorites = await this.redis.get('favoriteBooks')
    if (favorites) {
      return JSON.parse(favorites)
    }
    favorites = await this.bookRepository.getFavorites(10);
    await this.redis.setex('favoriteBooks', 300, JSON.stringify(favorites))
    return favorites;
  }
}
