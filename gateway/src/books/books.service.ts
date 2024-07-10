import { Injectable, Inject } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class BooksService {
  constructor(
    @Inject('INVENTORY_PACKAGE') private readonly inventory: ClientProxy
  ) {}
  async create(createBookDto: CreateBookDto) {
    const books = await firstValueFrom(
      this.inventory.send({
      cmd: 'addBook'
    },
    createBookDto)
    );
    return books;
    return 'This action adds a new book';
  }

  async findAll(queryData) {
    const books = await firstValueFrom(
      this.inventory.send({
      cmd: 'findBooks'
    },
    queryData)
    );
    return books;
  }

  async findOne(id: string) {
    const book = await firstValueFrom(
      this.inventory.send({
      cmd: 'findOneBook'
    },
    {bookId: id})
    );
    return book;
  }

  async favorites() {
    const book = await firstValueFrom(
      this.inventory.send({
      cmd: 'favoriteBooks'
    },
    {})
    );
    return book;
  }
  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
