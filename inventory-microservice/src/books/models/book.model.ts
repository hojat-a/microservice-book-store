import * as mongoose from 'mongoose';

export const BookModel = new mongoose.Schema({
  title: {
    type: String,
    require: true,
    index: true
  },
  author: {
    type: String,
    require: true,
    index: true
  },
  genre: {
    type: String,
    require: true
  },
  releaseYear: {
    type: Number,
    require: true
  },
  publisher: {
    type: String,
    require: true
  },
  price: {
    type: Number,
    require: true
  },
  stock : {
    type: Number,
  },
  score: {
    type: Number,
    default: 0
  },
}, { timestamps: true });