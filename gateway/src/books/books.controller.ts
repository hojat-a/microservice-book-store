import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Public, Roles } from 'src/common/decorators';
import { Role } from 'src/common/enums';
import { JoiValidationPipe } from 'src/common/pipes/validation.pipe';
import { createBookSchema, paramSchema, findAllSchema } from './schemas';

@Controller({ path: 'books', version: '1' })
export class BooksController {
  constructor(private readonly booksService: BooksService) { }

  @Roles(Role.Admin)
  @Post()
  create(@Body(new JoiValidationPipe(createBookSchema)) createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Public()
  @Get()
  findAll(@Query(new JoiValidationPipe(findAllSchema)) queryData) {
    return this.booksService.findAll(queryData);
  }

  @Public()
  @Get('favorites')
  favorites() {
    return this.booksService.favorites();
  }

  @Public()
  @Get(':id')
  findOne(@Param(new JoiValidationPipe(paramSchema)) params: { id: string }) {
    return this.booksService.findOne(params.id);
  }

  @Roles(Role.Admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(+id, updateBookDto);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(+id);
  }
}
