import { Connection } from 'mongoose';
import { BookModel } from '../models/index';

export const BooksProvider = [
  {
    provide: 'BOOK_MODEL',
    useFactory: (connection: Connection) => connection.model('books', BookModel),
    inject: ['DATABASE_CONNECTION'],
  },
];