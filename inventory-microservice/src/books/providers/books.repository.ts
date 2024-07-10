import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class BooksRepository {
  constructor(@Inject('BOOK_MODEL') private books) { }

  async createBook(createOrderDto) {
    const newBook = await new this.books(createOrderDto);
    return newBook.save();
  }

  async getBooks({ page = 1, pageSize = 10, genre = null, title = null, author = null, releaseYear = null }) {
    const query = {}
    if (title) {
      query["title"] = { $regex: title, $options: 'i' }
    }
    if (author) {
      query['author'] = author
    }
    if (genre) {
      query['genre'] = genre
    }
    if (releaseYear) {
      query['releaseYear'] = releaseYear
    }
    const books = await this.books.find(
      query,
      null,
      { skip: (page - 1) * pageSize, limit: pageSize }
    ).lean();
    return books;
  }

  async getBooksById(ids: string[]) {
    const query = { _id: { $in: ids } };
    const books = await this.books.find(query, { title: 1, price: 1, stock: 1 }).lean();
    return books;
  }

  async getOneBook(id) {
    const query = { _id: id }
    const book = await this.books.findOne(query).lean()
    return book;
  }

  async editDBook(updateBookDto) {
    try {
      return await this.books.findOneAndUpdate({ _id: updateBookDto.id }, updateBookDto, { new: true })
    } catch (error) {
      throw { errorReason: 'NotFound' }
    }
  }
  async getFavorites(limit=10) {
    return await this.books.find().sort({ score: -1 }).limit(limit).lean()
  }
}