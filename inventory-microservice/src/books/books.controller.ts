import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { MessagePattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';


@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @MessagePattern({cmd: 'addBook'})
  create(createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @MessagePattern({cmd: 'findBooks'})
  findAll(data) {
    return this.booksService.findAll(data);
  }

  @MessagePattern({cmd: 'findOneBook'})
  findOne(data) {
    return this.booksService.findOne(data);
  }

  @MessagePattern({cmd: 'editBook'})
  update(updateBookDto: UpdateBookDto) {
    return this.booksService.update(updateBookDto);
  }

  @MessagePattern({cmd: 'deleteBook'})
  remove(data) {
    return this.booksService.remove(+data);
  }

  @MessagePattern({cmd: 'favoriteBooks'})
  favorites() {
    return this.booksService.favorites();
  }

  @MessagePattern('order-fulfilled')
  async orderFulfilled(@Payload() data: any,
    @Ctx() context: RmqContext): Promise<void> {
    // Process the task here
    try {
      const channel = context.getChannelRef();
      const originalMsg = context.getMessage();

      channel.ack(originalMsg);
      console.log('Received task:', data);
    } catch (error) {
      console.log(error)
    }
  }
  @MessagePattern('order-rejected')
  async orderReject(@Payload() data: any,
    @Ctx() context: RmqContext): Promise<void> {
    // Process the task here
    try {
      const channel = context.getChannelRef();
      const originalMsg = context.getMessage();

      channel.ack(originalMsg);
      console.log('Received task:', data);
    } catch (error) {
      console.log(error)
    }

  }
}
